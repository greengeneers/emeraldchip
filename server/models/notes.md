// dynamic import for google/genai
let ai;
let type;
async function loadGenAI() {
const { GoogleGenAI, Type } = await import("@google/genai");
ai = new GoogleGenAI({ apiKey: process.env.EMERALDCHIP_API_KEY });
type = Type;
}
loadGenAI();

// constant
const CO2_CONVERSION = {
plastic: 1.02,
paper: 0.46,
glass: 0.31,
metals: 5.86,
scrapMetal: 3.57,
aluminum: 8.14,
steel: 0.86,
copper: 2.66,
textiles: 3.37,
};

class Donation {
constructor({
id,
user_id,
title,
image_url,
description,
status,
weight_lbs,
}) {
this.id = id;
this.userId = user_id;
this.title = title;
this.imageUrl = image_url;
this.description = description;
this.status = status;
this.weightLbs = weight_lbs;
}

static async create(userId, title, imageUrl, description, status, weightLbs) {
try {
const response = await ai.models.generateContent({
model: "gemini-2.0-flash-lite-001",
contents: `           You are an e-waste disposal expert with vast knowledge on the electronics material make up.
          Given the device: ${title}, provide a breakdown by weight of its raw materials based on this list:
            1. plastic
            2. paper
            3. glass
            4. metals
            5. scrap metal
            6. aluminum
            7. steel
            8. copper
            9. textiles
        `,
config: {
responseMimeType: "application/json",
responseSchema: {
type: type.OBJECT,
properties: {
plastic: {
type: type.NUMBER,
description: "The weight in kg of plastic in the device.",
},
paper: {
type: type.NUMBER,
description: "The weight in kg of paper in the device.",
},
glass: {
type: type.NUMBER,
description: "The weight in kg of glass in the device.",
},
metals: {
type: type.NUMBER,
description: "The weight in kg of metals in the device.",
},
scrapMetal: {
type: type.NUMBER,
description: "The weight in kg of scrap metal in the device.",
},
aluminum: {
type: type.NUMBER,
description: "The weight in kg of aluminum in the device.",
},
steel: {
type: type.NUMBER,
description: "The weight in kg of steel in the device.",
},
copper: {
type: type.NUMBER,
description: "The weight in kg of copper in the device.",
},
textiles: {
type: type.NUMBER,
description: "The weight in kg of textiles in the device.",
},
},
},
},
});
const breakdownInKg = JSON.parse(
response.candidates[0].content.parts[0].text,
);
let co2SavedKg = 0;
for (const key in breakdownInKg) {
co2SavedKg += breakdownInKg[key] \* CO2_CONVERSION[key];
}

      // NOTE: i kept weight_lbs in the schema for now... just so we don't have to update migrations atm
      const query = `
        INSERT INTO donations
        (donor_id, title, image_url, description, status, weight_lbs, co2_saved_kg)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        RETURNING *
      `;

      const result = await knex.raw(query, [
        userId,
        title,
        imageUrl,
        description,
        status,
        weightLbs,
        co2SavedKg,
      ]);

      return result.rows[0];
    } catch (error) {
      console.error("Error in Donation.create():", error);
    }

}

// static async create(userId, title, imageUrl, description, status, weightLbs) {
// const query = `  //   INSERT INTO donations
  //   (donor_id, title, image_url, description, status, weight_lbs, co2_saved_kg)
  //   VALUES (?, ?, ?, ?, ?, ?, ?)
  //   RETURNING *
  //`;

// const CO2_MULTIPLIER = 0.185; // kg CO₂e per lb (EPA/RecycleSmart)
// const co2SavedKg = +(weightLbs \* CO2_MULTIPLIER).toFixed(2);

// const result = await knex.raw(query, [
// userId,
// title,
// imageUrl,
// description,
// status,
// weightLbs,
// co2SavedKg,
// ]);

// return result.rows[0];
// }

static async list(userId) {
const query = `       SELECT title, image_url, status FROM donations
      WHERE donor_id = ?
    `;

    const result = await knex.raw(query, [userId]);

    return result.rows;

}

static async findById(userId, donationId) {
const query = `       SELECT * FROM donations
      WHERE donor_id = ? AND id = ?
    `;

    const result = await knex.raw(query, [userId, donationId]);

    return result.rows[0];

}

static async delete(userId, donationId) {
const query = `       DELETE FROM donations
      WHERE donor_id = ? AND id = ?
      RETURNING *;
    `;

    const result = await knex.raw(query, [userId, donationId]);

    return result.rows[0];

}

static async update(
userId,
donationId,
title,
imageUrl,
description,
status,
weightLbs,
) {
const query = `       UPDATE donations
      SET title = ?, image_url = ?,
      description = ?, status = ?,
      weight_lbs = ?, co2_saved_kg = ?
      WHERE donor_id = ? AND id = ?
      RETURNING *;
    `;

    const CO2_MULTIPLIER = 0.185; // kg CO₂e per lb (EPA/RecycleSmart)
    const co2SavedKg = +(weightLbs * CO2_MULTIPLIER).toFixed(2);

    const result = await knex.raw(query, [
      title,
      imageUrl,
      description,
      status,
      weightLbs,
      co2SavedKg,
      userId,
      donationId,
    ]);

    return result.rows[0];

}
}

module.exports = Donation;
