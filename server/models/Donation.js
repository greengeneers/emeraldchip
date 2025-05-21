const knex = require('../db/knex.js');

class Donation {
  static async create(userId, title, imageUrl, description, status, weightLbs) {
    const query = `
    INSERT INTO donations
    (donor_id, title, image_url, description, status, weight_lbs, co2_saved_kg)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    RETURNING *
  `;

    const CO2_MULTIPLIER = 0.185; // kg CO₂e per lb (EPA/RecycleSmart)
    const co2SavedKg = +(weightLbs * CO2_MULTIPLIER).toFixed(2);

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
  }

  static async list(userId) {
    const query = `
      SELECT id, title, image_url, status FROM donations
      WHERE donor_id = ?
    `;

    const result = await knex.raw(query, [userId]);

    return result.rows;
  }

  static async findById(userId, donationId) {
    const query = `
      SELECT * FROM donations
      WHERE donor_id = ? AND id = ?
    `;

    const result = await knex.raw(query, [userId, donationId]);

    return result.rows[0];
  }

  static async delete(userId, donationId) {
    const query = `
      DELETE FROM donations
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
    weightLbs
  ) {
    const query = `
      UPDATE donations
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
