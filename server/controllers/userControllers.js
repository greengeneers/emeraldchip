const User = require('../models/User');

/*
GET /api/users
Returns an array of all users in the database
*/
exports.listUsers = async (req, res) => {
  const users = await User.list();
  res.send(users);
};

/*
GET /api/users/:id
Returns a single user (if found)
*/
exports.showUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.find(id);
  if (!user) {
    return res.status(404).send({ message: 'User not found.' });
  }

  res.send(user);
};

/*
PATCH /api/users/:id
Updates a single user (if found) and only if authorized
*/
exports.updateUser = async (req, res) => {
  const { username, name, email, zipCode } = req.body;
  if (!username || !name || !email || !zipCode) {
    return res.status(400).send({ message: 'Name, email, and zipcode required for update.' });
  }

  const { id } = req.params;
  const { userId } = req.session;
  if (Number(id) !== Number(userId)) {
    return res.status(403).send({ message: "Unauthorized." });
  }
  const updatedUser = await User.update(id, username, email, name, zipCode);
  if (!updatedUser) {
    return res.status(404).send({ message: 'User not found.' });
  }

  res.send(updatedUser);
};
