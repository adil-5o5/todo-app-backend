const app = require('./app');           // Import the configured Express app
const connectDB = require('./config/db'); // Import database connection function

// Check required environment variables
console.log('🔍 Checking environment variables...');
console.log('🌍 NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('🚪 PORT:', process.env.PORT || 3000);
console.log('🗄️  MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Missing');
console.log('🔑 JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');

// Define the port number for the server (use environment variable for production)
const port = process.env.PORT || 3000;

// Connect to MongoDB database
// This establishes the connection before starting the server
connectDB();

// Start the Express server
// The server will listen for incoming HTTP requests on the specified port
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
    console.log(`📝 Available endpoints:`);
    console.log(`   POST /registration - Register a new user`);
    console.log(`   POST /login - Login user`);
    console.log(`   GET /users - Get all users`);
    console.log(`   GET /logout - Logout user`);
    console.log(`   POST /todo - Create a new todo`);
    console.log(`   GET /todos?userId=123 - Get todos for a user`);
    console.log(`   DELETE /deletetodo?id=123 - Delete a todo`);
});
