const Event = require("../models/Event");

/*
GET /api/events
Returns an array of all events in the database
Optionally, if there is a body contained in the request, the returned events can be limited to the scope of a month/year, -/+ 1 month buffer
*/
exports.listEvents = async (req, res, next) => {
  try {
    const { yearMonth } = req.params;
    // split and convert
    const [year, month] = [yearMonth.slice(0, 4), yearMonth.slice(4)].map((i) =>
      Number(i),
    );

    // since Date string months are 1-indexed
    const events = await Event.list(month + 1, year);
    if (!events) {
      res.status(404).send({
        message: "Error fetching resource.",
      });
    }
    res.send(events);
  } catch (error) {
    next(error);
  }
};

/*
GET /api/events/:id
Returns a single event (if found)
*/
exports.showEventById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await Event.findBy("id", id);
    if (!event) {
      return res.status(404).send({ message: "Event not found." });
    }

    res.send(event);
  } catch (error) {
    next(error);
  }
};

/*
GET /api/events/:name
Returns a single event (if found)
*/
exports.showEventByName = async (req, res, next) => {
  try {
    const { name } = req.params;

    const event = await Event.findBy("name", name);
    if (!event) {
      return res.status(404).send({ message: "Event not found." });
    }

    res.send(event);
  } catch (error) {
    next(error);
  }
};
