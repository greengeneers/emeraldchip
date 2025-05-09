const Event = require('../models/Event');

/*
GET /api/events
Returns an array of all events in the database
*/
exports.listEvents = async (req, res) => {
  const events = await Event.list();
  if (!events) {
    res.status(404).send({
      message: 'Error fetching resource.',
    });
  }
  res.send(events);
};

/*
GET /api/events/:id
Returns a single event (if found)
*/
exports.showEventById = async (req, res) => {
  const { id } = req.params;

  const event = await Event.findBy('id', id);
  if (!event) {
    return res.status(404).send({ message: 'Event not found.' });
  }

  res.send(event);
};

/*
GET /api/events/:name
Returns a single event (if found)
*/
exports.showEventByName = async (req, res) => {
  const { name } = req.params;

  const event = await Event.findBy('name', name);
  if (!event) {
    return res.status(404).send({ message: 'Event not found.' });
  }

  res.send(event);
};
