const knex = require('../db/knex');

class Event {
  // Create an Event instance with all the required details
  constructor({ id, created_at, updated_at, name, event_url, address, start_date, end_date}) {
    this.id = id;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
    this.name = name;
    this.eventUrl = event_url;
    this.address = address;
    this.startDate = start_date;
    this.endDate = end_date;
  }

  /**
   * Converts a given `Date` object to a new `Date` object representing the same time in UTC.
   *
   * @param {Date} date - The date to convert to UTC.
   * @returns {Date}  - A new Date object representing the UTC equivalent of the input `date`.
   * @sideEffects:
   *  - None
   */
  static toUTCDate(date) {
    return new Date(Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      date.getUTCMilliseconds()
    ));
  }

  static async create(createdAt, updatedAt, name, eventUrl, address, startDate, endDate) {
    try {
      const query = `
        INSERT INTO events (created_at, updated_at, name, eventUrl, address, startDate, endDate)
        VALUES (?, ?, ?, ?, ?, ? ,?)
        RETURNING *;
      `;
      const result = await knex.raw(query, [
        createdAt, updatedAt, name, eventUrl, address, startDate, endDate
      ]);

      const rawEventData = result.rows[0];
      return new Event(rawEventData);
    } catch (error) {
      console.error('Error in Event.create():', error);
    }
  }

  // static async list(month, year) {
  //   try {
  //     const query = `SELECT * FROM events;`;
  //     const result = await knex.raw(query);
  //     return result.rows.map((rawEventData) => new Event(rawEventData));
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  static async list(month, year) {
    try {
      const startOfMonth = new Date(Date.UTC(year, month - 1, 1)); // Note: month is 0-indexed in JavaScript Dates
      const endOfMonth = new Date(Date.UTC(year, month, 1)); // First day of the next month
      const startWithBuffer = new Date(startOfMonth);
      startWithBuffer.setUTCMonth(startWithBuffer.getUTCMonth() - 1); // Subtract 1 month (buffer)
      const endWithBuffer = new Date(endOfMonth);
      endWithBuffer.setUTCMonth(endWithBuffer.getUTCMonth() + 1); // Add 1 month (buffer)
      const startDateString = startWithBuffer.toISOString();
      const endDateString = endWithBuffer.toISOString();

      const query = `
        SELECT *
        FROM events
        WHERE start_date <= '${endDateString}' AND end_date >= '${startDateString}'
      `;
      const result = await knex.raw(query);
      return result.rows.map((rawEventData) => new Event(rawEventData));
    } catch (error) {
      console.error('Error in Event.list():', error);
    }
  }

  /**
   * Finds an event in the database based on a specified criteria (e.g., by ID or name).
   *
   * @param {string} by - The column to search by (e.g., 'id' or 'name').
   * @param {string} key - The value to search for in the specified column.
   * @returns {Event|null} - An `Event` instance if found, otherwise `null`.
   * @sideEffects:
   *  - Executes a SQL query against the database.
   *  - Creates a new `Event` instance if a matching row is found.
   */
  static async findBy(by, key) {
    try {
      const query = `SELECT * FROM events WHERE ${by} = ?`;
      const result = await knex.raw(query, [key]);
      const rawEventData = result.rows[0];
      return rawEventData ? new Event(rawEventData) : null;
    } catch (error) {
      console.error('Error in Event.findBy():', error);
    }
  }

  /**
   * Updates all events by scraping their URLs for the latest information.
   * This function iterates through a list of events and, for each event,
   * initiates a scraping process to refresh its data.
   *
   * @returns {void}
   * @sideEffects:
   *  - Modifies event data by scraping and updating information from external URLs.
   */
  static async updateAllEvents() {
    const eventsArr = await Event.list();
    for (const event of eventsArr) {
      // TODO: Scrape event.eventUrl in order to grab
      // the latest information. This is periodic, probably once every
      // week or every day, to make sure that all event data is accurate.

      // TODO: Push changes into DB.
    }
  }

  static async deleteAll() {
    try {
      return knex('events').del();
    } catch (error) {
      console.error('Error in Event.deleteAll():', error);
    }
  }
}

module.exports = Event;
