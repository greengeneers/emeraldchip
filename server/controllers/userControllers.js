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
  const { name, email, zipCode } = req.body;
  if (!name || !email || !zipCode) {
    return res.status(400).send({ message: 'Name, email, and zipcode required for update.' });
  }


  
  // A user is only authorized to modify their own user information
  // e.g. User 5 sends a PATCH /api/users/5 request -> success!
  // e.g. User 5 sends a PATCH /api/users/4 request -> 403!
  const userToModify = Number(req.params.id);
  const userRequestingChange = Number(req.session.userId);
  if (userRequestingChange !== userToModify) {
    return res.status(403).send({ message: "Unauthorized." });
  }
  
  const updatedUser = await User.update(userToModify, name. email, zipCode);
  if (!updatedUser) {
    return res.status(404).send({ message: 'User not found.' });
  }
  
  res.send(updatedUser);
};
// exports.testModal = async (req, res) => {
//   try {

//     const user = await User.find(1); 
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// };
exports.testModal = async (req, res) => {
  try {
    if (req.method === 'GET') {

      const user = await User.find(1);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      return res.json(user);
    }

    if (req.method === 'PATCH') {
   
      const { name, email, zipCode } = req.body;


      if (!name || !email || !zipCode) {
        return res
          .status(400)
          .json({ message: 'Name, email, and zip code are required.' });
      }

      const updatedUser = await User.update(1, name, email, zipCode);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }

      return res.json(updatedUser);
    }


  res.setHeader('Allow', ['GET', 'PATCH']);
   return res.status(405).json({ message: 'Method Not Allowed' });
} catch (error) {
  console.error('Error handling /api/test-modal:', error);
   res.status(500).json({ message: 'Internal server error.' });
  }
};