/* eslint-disable max-len */
const knex = require('../db/knex');

class Rsvp {
  /**
   * Lists all RSVP records from the database.
   *
   * @returns {array} result.rows - An array of RSVP objects.
   * @sideEffects:
   *  - Executes a SQL query against the database via `knex.raw()`.
   */
  static async list(userId) {
    try {
      const query = `
        SELECT * FROM rsvp
        WHERE donor_id = ?
      `;

      const result = await knex.raw(query, [userId]);

      return result.rows;
    } catch (error) {
      console.error('Error in Rsvp.list():', error);
    }
  }

  /**
   * Handles the logic to connect a user (donor) to an event in the `rsvp` linking table. It inserts a new record into the `rsvp` table, associating the user with the event.
   *
   * @param {number} userId - The ID of the user who is RSVPing.
   * @returns {boolean} success - `true` if the insert into the `rsvp` table was successful, `false` otherwise.
   * @sideEffects:
   *  - Inserts a new record into the `rsvp` table.
   */
  static async add(userId, eventId) {
    try {
      const query = `
        INSERT INTO rsvp (donor_id, event_id)
        VALUES (?, ?)
        ON CONFLICT (donor_id, event_id) DO NOTHING
        RETURNING *;
      `;

      const result = await knex.raw(query, [userId, eventId]);

      return !!result.rows[0];
    } catch (error) {
      console.error('Error in Rsvp.add():', error.stack);
    }
  }

  /**
   * Removes an RSVP from the database.
   *
   * @param {number} userId - The ID of the user.
   * @param {number} eventId - The ID of the event.
   * @returns {Promise<boolean>} - True if the RSVP was successfully removed, false otherwise.
   */
  static async remove(userId, eventId) {
    try {
      const query = `
        DELETE FROM rsvp
        WHERE donor_id = ? AND event_id = ?
        RETURNING *;
      `;
      const result = await knex.raw(query, [userId, eventId]);
      return !!result.rowCount;
    } catch (error) {
      console.error('Error in Rsvp.remove()', error);
    }
  }

  static async deleteAll() {
    try {
      return knex('rsvp').del();
    } catch (error) {
      console.error('Error in Rsvp.deleteAll()', error);
    }
  }
}

module.exports = Rsvp;
