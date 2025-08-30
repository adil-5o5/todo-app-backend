const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * This function establishes a connection to the MongoDB server
 * and handles connection errors gracefully
 */
async function connectDB() {
    try {
        // Use environment variable for MongoDB URI or fallback to local
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp';
        
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,      // Use new URL parser
            useUnifiedTopology: true    // Use new server discovery and monitoring engine
        });
        
        console.log("✅ MongoDB connected successfully");
        console.log("📊 Database: Connected to cloud database");
        
    } catch (err) {
        // If connection fails, log the error and exit the process
        console.error("❌ MongoDB connection error:", err.message);
        console.error("💡 Check your MONGODB_URI environment variable");
        process.exit(1); // Exit with error code 1
    }
}

// Export the connectDB function
module.exports = connectDB;
