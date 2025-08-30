const express = require('express');
const cors = require('cors');        // Enable Cross-Origin Resource Sharing
const bodyParser = require('body-parser');  // Parse incoming request bodies
const userRouter = require('./routers/user.routes');    // User-related routes
const ToDoRouter = require('./routers/todo.routes');    // Todo-related routes

// Create Express application instance
const app = express();

// Enable CORS for all routes (allows frontend to make requests)
app.use(cors());

// Middleware to parse JSON request bodies
// This allows us to access req.body in our route handlers
app.use(bodyParser.json());

// Mount routes - Define URL prefixes for different route groups
// All user routes will start with '/' (e.g., /registration, /login, /users, /logout)
app.use('/', userRouter);

// All todo routes will start with '/' (e.g., /todo, /todos, /deletetodo)
app.use('/', ToDoRouter);

// Export the configured Express app
module.exports = app;
