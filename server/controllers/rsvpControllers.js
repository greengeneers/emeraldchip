const Rsvp = require("../models/Rsvp");

exports.listRsvp = async (req, res) => {
  const { userId } = req.session;
  const rsvps = await Rsvp.list(userId);
  if (!rsvps) {
    return res.status(404).send({
      message: "Error fetching resource.",
    });
  }
  res.send(rsvps);
};

/*
POST /api/rsvp
Inserts into the linking table 'rsvp' with the eventId and userId if the user is authorized.
*/
exports.addRsvp = async (req, res) => {
  const { userId } = req.session;
  const { eventId } = req.params;

  const data = await Rsvp.add(userId, eventId);

  if (!data) {
    return res
      .status(409)
      .send({ message: "RSVP failed, link already exists!" });
  }

  res.status(201).send({ message: "RSVP created!" });
};

/*
DELETE /api/rsvp
Deletes a row in the linking table 'rsvp' with matching eventId and userId if the user is authorized.
*/
exports.removeRsvp = async (req, res) => {
  const { userId } = req.session;
  const { eventId } = req.params;

  const removeRsvpSuccess = await Rsvp.remove(userId, eventId);
  if (!removeRsvpSuccess) {
    return res
      .status(404)
      .send({ message: "RSVP removal failed, link does not exist!" });
  }

  res.status(200).send({ message: "RSVP removal successful!" });
};

/*
GET /api/rsvp/:eventId
Checks if this specific RSVP exists. UserId is grabbed from session.
*/
exports.checkRsvp = async (req, res) => {
  const { userId } = req.session;
  const { eventId } = req.params;

  const check = await Rsvp.check(userId, eventId);
  if (check === 1) res.status(200).send({ exists: true });
  else res.status(200).send({ exists: false });
};
