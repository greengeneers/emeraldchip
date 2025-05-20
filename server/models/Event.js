const knex = require("../db/knex");
const axios = require("axios");
const cheerio = require("cheerio");

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

  static async create(
    createdAt,
    updatedAt,
    name,
    eventUrl,
    address,
    startDate,
    endDate,
  ) {
    try {
      const query = `
        INSERT INTO events (created_at, updated_at, name, eventUrl, address, startDate, endDate)
        VALUES (?, ?, ?, ?, ?, ? ,?)
        RETURNING *;
      `;
      const result = await knex.raw(query, [
        createdAt,
        updatedAt,
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
  static async updateAllEvents() {
    const lesEvents = await Event.scrapeLESEvents();
    console.log(lesEvents);
    // const eventsArr = await Event.list();
    // for (const event of eventsArr) {
    //   // TODO: Scrape event.eventUrl in order to grab
    //   // the latest information. This is periodic, probably once every
    //   // week or every day, to make sure that all event data is accurate.
    //   // TODO: Push changes into DB.
    // }
  }

  static async scrapeLESEvents() {
    try {
      // URL to scrape
      const url =
        "https://www.lesecologycenter.org/calendar/category/public-events-e-waste/ewaste-events/";

      // Fetch the HTML content with added headers to mimic a browser
      console.log("Fetching data from the website...");
      const response = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
          Connection: "keep-alive",
          "Upgrade-Insecure-Requests": "1",
          "Cache-Control": "max-age=0",
        },
        timeout: 10000,
      });

      const html = response.data;

      // Load HTML content into cheerio
      const $ = cheerio.load(html);

      // Debug: Output HTML structure to understand website layout
      console.log("Analyzing HTML structure...");

      // Let's try multiple selectors that might match event containers
      let eventContainers = $(".tribe-events-loop .type-tribe_events");

      if (eventContainers.length === 0) {
        console.log("Trying alternative selectors...");
        eventContainers = $(".tribe-events-loop article");
      }

      if (eventContainers.length === 0) {
        console.log("Trying more general selectors...");
        eventContainers = $("[data-tribejson]");
      }

      if (eventContainers.length === 0) {
        console.log("Checking for any event-related elements...");
        eventContainers = $('[class*="event"]');
      }

      console.log(
        `Found ${eventContainers.length} potential events. Processing...`,
      );

      // Array to store event data
      const events = [];

      // Process each event container
      eventContainers.each((index, element) => {
        try {
          // Try multiple possible title selectors
          let titleElement = $(element).find(
            ".tribe-events-list-event-title a, .tribe-event-url",
          );
          if (titleElement.length === 0) {
            titleElement = $(element).find("h2 a, h3 a");
          }

          const title =
            titleElement.text().trim() ||
            $(element).find('[class*="title"]').text().trim();
          const eventUrl = titleElement.attr("href") || "";

          // Extract date information - try multiple possible selectors
          let dateInfo = $(element).find(
            ".tribe-event-schedule-details, .tribe-event-date-start",
          );
          if (dateInfo.length === 0) {
            dateInfo = $(element).find(
              '[class*="date"], [class*="time"], [class*="when"]',
            );
          }

          let dateText = dateInfo.text().trim();

          // If no direct date text, look at the JSON data that might be embedded
          if (!dateText && $(element).attr("data-tribejson")) {
            try {
              const jsonData = JSON.parse($(element).attr("data-tribejson"));
              if (jsonData.start_date) {
                dateText = jsonData.start_date;
                if (jsonData.end_date) {
                  dateText += ` - ${jsonData.end_date}`;
                }
              }
            } catch (e) {
              console.log("Failed to parse JSON data for event", index);
            }
          }

          // Attempt to extract date, start time, and end time
          let date = "";
          let startTime = "";
          let endTime = "";

          // Handle different possible date formats
          if (dateText) {
            // Try to match pattern: "Month Day @ Time - Time" or similar
            const dateTimeMatch = dateText.match(
              /([A-Za-z]+\s+\d+(?:,\s+\d+)?)\s*@\s*(\d+:\d+\s*(?:am|pm))\s*-\s*(\d+:\d+\s*(?:am|pm))/i,
            );

            if (dateTimeMatch) {
              date = dateTimeMatch[1].trim();
              startTime = dateTimeMatch[2].trim();
              endTime = dateTimeMatch[3].trim();
            } else {
              // Just grab what we can
              // Look for separate date and time elements
              const startDateEl = $(element).find(".tribe-event-date-start");
              const endDateEl = $(element).find(".tribe-event-date-end");

              if (startDateEl.length && endDateEl.length) {
                date = startDateEl.text().split("@")[0].trim();
                startTime = startDateEl.text().split("@")[1]?.trim() || "";
                endTime = endDateEl.text().trim();
              } else {
                // Last resort: just use the whole text and try to clean it
                date = dateText.split("@")[0]?.trim() || dateText;

                // If there's a time part, extract it
                if (dateText.includes("@")) {
                  const timePart = dateText.split("@")[1]?.trim() || "";
                  if (timePart.includes("-")) {
                    startTime = timePart.split("-")[0]?.trim() || "";
                    endTime = timePart.split("-")[1]?.trim() || "";
                  } else {
                    startTime = timePart;
                  }
                }
              }
            }
          }

          // Add event data to array if we at least have a title
          if (title) {
            events.push({
              title,
              url: eventUrl,
              date,
              startTime,
              endTime,
            });
          }
        } catch (err) {
          console.log(`Error processing event ${index}:`, err.message);
        }
      });

      // If we still don't have events, try an alternative approach for calendar events
      if (events.length === 0) {
        console.log("Trying to find events in calendar format...");
        const calendarEvents = $(".tribe-events-calendar-list__event");

        calendarEvents.each((index, element) => {
          try {
            const title = $(element)
              .find(".tribe-events-calendar-list__event-title-link")
              .text()
              .trim();
            const eventUrl = $(element)
              .find(".tribe-events-calendar-list__event-title-link")
              .attr("href");
            const dateText = $(element)
              .find(".tribe-events-calendar-list__event-datetime")
              .text()
              .trim();

            let date = "";
            let startTime = "";
            let endTime = "";

            // Simple extraction from datetime text
            if (dateText) {
              const parts = dateText.split("@");
              if (parts.length > 0) {
                date = parts[0].trim();

                if (parts.length > 1) {
                  const timeParts = parts[1].split("-");
                  startTime = timeParts[0].trim();
                  endTime = timeParts[1]?.trim() || "";
                }
              }
            }

            if (title) {
              events.push({
                title,
                url: eventUrl,
                date,
                startTime,
                endTime,
              });
            }
          } catch (err) {
            console.log(
              `Error processing calendar event ${index}:`,
              err.message,
            );
          }
        });
      }

      // Display results
      if (events.length > 0) {
        console.log("E-Waste Events:");
        console.log("==============");

        events.forEach((event, index) => {
          console.log(`Event #${index + 1}:`);
          console.log(`Title: ${event.title}`);
          console.log(`URL: ${event.url}`);
          console.log(`Date: ${event.date}`);
          console.log(`Time: ${event.startTime} - ${event.endTime}`);
          console.log("---------------------------");
        });
      } else {
        console.log(
          "No events found. The website structure might have changed.",
        );
      }

      return events;
    } catch (error) {
      console.error("Error scraping website:", error.message);
      return [];
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
