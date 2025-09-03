const express = require('express');
const cors = require('cors');        // Enable Cross-Origin Resource Sharing
const bodyParser = require('body-parser');  // Parse incoming request bodies
const userRouter = require('./routers/user.routes');    // User-related routes
const ToDoRouter = require('./routers/todo.routes');    // Todo-related routes

// Create Express application instance
const app = express();

// Enable CORS for all routes (allows frontend to make requests)
app.use(cors({
  origin: '*', // Allow all origins for mobile apps
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middleware to parse JSON request bodies
// This allows us to access req.body in our route handlers
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Database status middleware (for non-critical routes)
app.use((req, res, next) => {
  // Skip database check for health and root endpoints
  if (req.path === '/health' || req.path === '/') {
    return next();
  }
  
  // Check if database is connected for database-dependent routes
  if (!global.dbConnected && process.env.NODE_ENV === 'production') {
    return res.status(503).json({
      status: false,
      error: 'Database unavailable',
      message: 'Server is starting up, please try again in a moment'
    });
  }
  
  next();
});

// Health check endpoint for deployment platforms (must come BEFORE routes)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    database: global.dbConnected ? 'Connected' : 'Disconnected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint (must come BEFORE routes)
app.get('/', (req, res) => {
  res.json({ 
    message: 'Todo API Server',
    version: '1.0.0',
    endpoints: {
      auth: ['POST /registration', 'POST /login', 'GET /logout'],
      todos: ['POST /todo', 'GET /todos', 'DELETE /deletetodo']
    }
  });
});

// Mount routes - Define URL prefixes for different route groups
// All user routes will start with '/' (e.g., /registration, /login, /users, /logout)
app.use('/', userRouter);

// All todo routes will start with '/' (e.g., /todo, /todos, /deletetodo)
app.use('/', ToDoRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    status: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler - catch all unmatched routes (Express 4 compatible)
app.use((req, res) => {
  res.status(404).json({
    status: false,
    error: 'Route not found',
    path: req.originalUrl
  });
});



// Export the configured Express app
module.exports = app;
