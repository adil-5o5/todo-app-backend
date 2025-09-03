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
        
        console.log("🔌 Attempting to connect to MongoDB...");
        console.log("📊 URI:", mongoURI.includes('mongodb+srv') ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB');
        
        // For local development, skip MongoDB connection if not available
        if (!process.env.MONGODB_URI && process.env.NODE_ENV !== 'production') {
            console.log("⚠️  Skipping MongoDB connection for local development");
            console.log("💡 Set MONGODB_URI environment variable to connect to MongoDB");
            return;
        }
        
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,      // Use new URL parser
            useUnifiedTopology: true,   // Use new server discovery and monitoring engine
            serverSelectionTimeoutMS: 15000, // 15 seconds timeout
            socketTimeoutMS: 45000      // 45 seconds socket timeout
        });
        
        console.log("✅ MongoDB connected successfully");
        console.log("📊 Database: Connected to cloud database");
        
    } catch (err) {
        // If connection fails, log the error and exit the process
        console.error("❌ MongoDB connection error:", err.message);
        console.error("💡 Check your MONGODB_URI environment variable");
        console.error("💡 Make sure your MongoDB Atlas cluster is accessible");
        console.error("💡 Check if your IP is whitelisted in MongoDB Atlas");
        
        // Only exit in production
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        } else {
            console.log("⚠️  Continuing without database connection for local development");
        }
    }
}

// Export the connectDB function
module.exports = connectDB;
