
const knex = require('../db/knex');

class Rsvp {
  /**
   * Lists all RSVP records from the database.
   *
   * @returns {array} result.rows - An array of RSVP objects.
   * @sideEffects:
   *  - Executes a SQL query against the database via `knex.raw()`.
   */
    static async list() {
      try {
        const query = `SELECT * FROM rsvp;`;
        const result = await knex.raw(query);
        return result.rows;
      } catch (error) {
        console.error('An error occurred: ', error);
        return null;
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
      const success = result.rows[0];
      return success ? true : false;
    } catch(error) {
      console.error('An error occurred: ', error);
      return null;
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
      return result.rowCount > 0; // if any changes made
    } catch (error) {
      console.error('An error occurred: ', error);
      return null;
    }
  }

  static async deleteAll() {
    try {
      return knex('rsvp').del();
    } catch (error) {
      console.error('An error occurred: ', error);
      return null
    }
  }
}

module.exports = Rsvp;
