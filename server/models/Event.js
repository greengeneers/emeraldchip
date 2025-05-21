const knex = require("../db/knex");
const { getRequest } = require("../services/htmlGet");

// dynamic import for google/genai
let ai;
let type;
async function loadGenAI() {
  const { GoogleGenAI, Type } = await import("@google/genai");
  ai = new GoogleGenAI({ apiKey: process.env.EMERALDCHIP_API_KEY });
  type = Type;
}

class Event {
  // Create an Event instance with all the required details
  constructor({
    id,
    created_at,
    updated_at,
    name,
    event_url,
    address,
    start_date,
    end_date,
  }) {
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
    return new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds(),
      ),
    );
  }

  static async create(name, eventUrl, address, startDate, endDate) {
    try {
      const query = `
        INSERT INTO events (name, event_url, address, start_date, end_date)
        VALUES (?, ?, ?, ? ,?)
        RETURNING *;
      `;
      const result = await knex.raw(query, [
        name,
        eventUrl,
        address,
        startDate,
        endDate,
      ]);

      const rawEventData = result.rows[0];
      return new Event(rawEventData);
    } catch (error) {
      console.error("Error in Event.create():", error);
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
      console.error("Error in Event.list():", error);
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
      console.error("Error in Event.findBy():", error);
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
  static async updateAllEvents(url) {
    const htmlBody = await getRequest(url);
    await loadGenAI();
    console.log("generating...");
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: `
        Scrape all the event URLs from this htmlBody
        ${htmlBody}
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: type.ARRAY,
          description: "Array of links.",
          items: {
            type: type.STRING,
          },
        },
      },
    });

    const responseJSON = JSON.parse(
      response.candidates[0].content.parts[0].text,
    );
    console.log(responseJSON);
    console.log(typeof responseJSON);

    const eventDataArray = [];
    for (let i = 0; i < responseJSON.length; i++) {
      console.log(`doing the ${i + 1}st one`);
      const eventHtmlBody = await getRequest(responseJSON[i]);
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-001",
        // model: "gemini-2.5-flash-preview-04-17",
        contents: `
          Find the following:
            1. name
            2. address
            3. startDate
            4. endDate
          Use this htmlBody: ${eventHtmlBody}
        `,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: type.OBJECT,
            properties: {
              name: { type: type.STRING },
              address: { type: type.STRING },
              startDate: { type: type.STRING },
              endDate: { type: type.STRING },
            },
            propertyOrdering: ["name", "address", "startDate", "endDate"],
          },
        },
      });
      const eventResponseJSON = JSON.parse(
        response.candidates[0].content.parts[0].text,
      );
      eventResponseJSON["eventUrl"] = responseJSON[i];
      eventDataArray.push(eventResponseJSON);
      console.log(eventResponseJSON);
      console.log(typeof eventResponseJSON);

      setTimeout(() => {}, 2000);
    }

    console.log(eventDataArray);
    // name,
    // eventUrl,
    // address,
    // startDate,
    // endDate,
    for (let i = 0; i < eventDataArray.length; i++) {
      console.log(`inserting into db... ${i + 1}th`);
      try {
        const { name, eventUrl, startDate, address, endDate } =
          eventDataArray[i];
        await Event.create(name, eventUrl, address, startDate, endDate);
      } catch (error) {
        console.error("Error in Event.updateAll()");
      }
    }
  }

  static async deleteAll() {
    try {
      return knex("events").del();
    } catch (error) {
      console.error("Error in Event.deleteAll():", error);
    }
  }
}

module.exports = Event;
