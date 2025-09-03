const app = require('./app');           // Import the configured Express app
const connectDB = require('./config/db'); // Import database connection function

// Set default JWT secret for local development if not provided
if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = '8353d26e0750e7e36caac8af7398b06c2f9fe91694aec24273b6bcedb49bbc857c4df04df36989669d06f6e0abc37fdfd266a09ffe65eaf86dd742b578e1aa54';
    console.log('⚠️  Using default JWT_SECRET for development - CHANGE THIS IN PRODUCTION!');
}

// Check required environment variables
console.log('🔍 Checking environment variables...');
console.log('🌍 NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('🚪 PORT:', process.env.PORT || 'Not Set (using default 3000)');
console.log('🗄️  MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Missing');
console.log('🔑 JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');

// Check if we're in production environment
if (process.env.NODE_ENV === 'production') {
    console.log('🚀 PRODUCTION MODE: Server will require database connection');
    if (!process.env.MONGODB_URI) {
        console.error('❌ CRITICAL: MONGODB_URI is required in production!');
        console.error('💡 Set this environment variable on Render');
    }
    if (!process.env.JWT_SECRET) {
        console.error('❌ CRITICAL: JWT_SECRET is required in production!');
        console.error('💡 Set this environment variable on Render');
    }
}

// Define the port number for the server (use environment variable for production)
// Force port 3000 for local development to avoid conflicts
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 3000) : 3000;
console.log('🔌 Final port being used:', port);
console.log('🔒 Port override applied for development');

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
