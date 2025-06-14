const knex = require('../db/knex.js');
const { calcCO2Saved } = require('../services/co2Calc.js');

class Donation {
  static async create(userId, title, imageUrl, description, status, weightLbs) {
    const query = `
    INSERT INTO donations
    (donor_id, title, image_url, description, status, weight_lbs, co2_saved_kg)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    RETURNING *
  `;

    const co2SavedKg = calcCO2Saved(weightLbs);

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
      SELECT * FROM donations
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
      RETURNING *
    `;

    const co2SavedKg = calcCO2Saved(weightLbs);

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
