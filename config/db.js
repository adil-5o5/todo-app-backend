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
        
        // For local development, try to connect but don't fail if unavailable
        if (!process.env.MONGODB_URI && process.env.NODE_ENV !== 'production') {
            console.log("⚠️  No MONGODB_URI set - trying local MongoDB connection");
            console.log("💡 Set MONGODB_URI environment variable for cloud database");
        }
        
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 15000, // 15 seconds timeout
            socketTimeoutMS: 45000      // 45 seconds socket timeout
        });
        
        console.log("✅ MongoDB connected successfully");
        console.log("📊 Database:", mongoURI.includes('mongodb+srv') ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB');
        
        // Set global flag for database status
        global.dbConnected = true;
        
    } catch (err) {
        // If connection fails, log the error and handle gracefully
        console.error("❌ MongoDB connection error:", err.message);
        console.error("💡 Check your MONGODB_URI environment variable");
        console.error("💡 Make sure your MongoDB Atlas cluster is accessible");
        console.error("💡 Check if your IP is whitelisted in MongoDB Atlas");
        
        // Set global flag for database status
        global.dbConnected = false;
        
        // Only exit in production
        if (process.env.NODE_ENV === 'production') {
            console.error("🚨 Production environment requires database connection");
            console.error("💡 Check your MONGODB_URI environment variable on Render");
            console.error("💡 Make sure MongoDB Atlas is accessible and IP is whitelisted");
            process.exit(1);
        } else {
            console.log("⚠️  Continuing without database connection for local development");
            console.log("💡 Server will start but database operations will fail");
        }
    }
}

// Export the connectDB function
module.exports = connectDB;
