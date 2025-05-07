/* eslint-disable spaced-comment */
///////////////////////////////
// Imports
///////////////////////////////

require('dotenv').config();
const path = require('path');
const express = require('express');

// middleware imports
const handleCookieSessions = require('./middleware/handleCookieSessions');
const checkAuthentication = require('./middleware/checkAuthentication');
const logRoutes = require('./middleware/logRoutes');
const logErrors = require('./middleware/logErrors');

// controller imports
const authControllers = require('./controllers/authControllers');
const userControllers = require('./controllers/userControllers');
const eventControllers = require('./controllers/eventControllers');
const rsvpControllers = require('./controllers/rsvpControllers');
const dashboardControllers = require('./controllers/dashboardController.js');

const app = express();

// middleware
app.use(handleCookieSessions); // adds a session property to each request representing the cookie
app.use(logRoutes); // print information about each incoming request
app.use(express.json()); // parse incoming request bodies as JSON
app.use(express.static(path.join(__dirname, '../frontend/dist'))); // Serve static assets from the dist folder of the frontend

///////////////////////////////
// Auth Routes
///////////////////////////////

app.post('/api/auth/register', authControllers.registerUser);
app.post('/api/auth/login', authControllers.loginUser);
app.get('/api/auth/me', authControllers.showMe);
app.delete('/api/auth/logout', authControllers.logoutUser);

///////////////////////////////
// User Routes
///////////////////////////////

// These actions require users to be logged in (authentication)
// Express lets us pass a piece of middleware to run for a specific endpoint
app.get('/api/users', checkAuthentication, userControllers.listUsers);
app.get('/api/users/:id', checkAuthentication, userControllers.showUser);
app.patch('/api/users/:id', checkAuthentication, userControllers.updateUser);

// EVENT ENDPOINTS:
app.get('/api/events', checkAuthentication, eventControllers.listEvents);
app.get('/api/events/:id', checkAuthentication, eventControllers.showEventById);
app.get('/api/events/:name', checkAuthentication, eventControllers.showEventByName);

// RSVP ENDPOINTS:
app.get('/api/rsvp', checkAuthentication, rsvpControllers.listRsvp);
app.post('/api/rsvp/:eventId', checkAuthentication, rsvpControllers.addRsvp);
app.delete('/api/rsvp/:eventId', checkAuthentication, rsvpControllers.removeRsvp);

///////////////////////////////
// Dashboard Routes
///////////////////////////////

app.get(
  '/api/dashboard',
  checkAuthentication,
  dashboardControllers.showOverview
);

///////////////////////////////
// Fallback Routes
///////////////////////////////

// Requests meant for the API will be sent along to the router.
// For all other requests, send back the index.html file in the dist folder.
app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.use(logErrors);

///////////////////////////////
// Start Listening
///////////////////////////////

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
