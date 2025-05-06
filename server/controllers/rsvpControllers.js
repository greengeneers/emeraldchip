
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
  const { userId, eventId } = req.body;
  if (!userId) {
    return res.status(400).send({ message: 'User Id required.' });
  }

  // A user is only authorized to modify information that relates to them
  // e.g. User 5 sends a PATCH /api/users/5 request -> success!
  // e.g. User 5 sends a PATCH /api/users/4 request -> 403!
  const userToRsvp = Number(userId);
  const userRequestingChange = Number(req.session.userId);
  if (userRequestingChange !== userToRsvp) {
    return res.status(403).send({ message: "Unauthorized." });
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
  const { userId, eventId } = req.body;
  if (!userId) {
    return res.status(400).send({ message: 'User Id required.' });
  }

  // A user is only authorized to modify information that relates to them
  // e.g. User 5 sends a PATCH /api/users/5 request -> success!
  // e.g. User 5 sends a PATCH /api/users/4 request -> 403!
  const userToRemoveRsvp = Number(userId);
  const userRequestingChange = Number(req.session.userId);
  if (userRequestingChange !== userToRemoveRsvp) {
    return res.status(403).send({ message: "Unauthorized." });
  }

  const removeRsvpSuccess = await Rsvp.remove(userId, eventId);
  if (!removeRsvpSuccess) {
    return res.status(404).send({ message: 'RSVP removal failed! Link does not exist!' });
  }

  res.status(200).send({ message: 'RSVP removal success!' });
};
