
const Rsvp = require('../models/Rsvp');

exports.listRsvp = async (req, res) => {
  const rsvps = await Rsvp.list();
  if (!rsvps) {
    return res.status(404).send({
      message: 'Error fetching resource.'
    })
  }
  res.send(rsvps);
}

/*
POST /api/rsvp
Inserts into the linking table 'rsvp' with the eventId and userId if the user is authorized.
*/
exports.addRsvp = async (req, res) => {
  const { userId } = req.session;
  const { eventId } = req.params;
  if (!userId) {
    return res.status(400).send({ message: 'Unauthorized.' });
  }

  const rsvpSuccess = await Rsvp.add(userId, eventId);
  if (!rsvpSuccess) {
    return res.status(404).send({ message: 'RSVP failed! Link already exists!' });
  }

  res.status(200).send({ message: 'RSVP success!' });
};

/*
DELETE /api/rsvp
Deletes a row in the linking table 'rsvp' with matching eventId and userId if the user is authorized.
*/
exports.removeRsvp = async (req, res) => {
  const { userId } = req.session;
  const { eventId } = req.params;
  if (!userId) {
    return res.status(400).send({ message: 'Unauthorized.' });
  }

  const removeRsvpSuccess = await Rsvp.remove(userId, eventId);
  if (!removeRsvpSuccess) {
    return res.status(404).send({ message: 'RSVP removal failed! Link does not exist!' });
  }

  res.status(200).send({ message: 'RSVP removal success!' });
};
