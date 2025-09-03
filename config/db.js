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
        
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,      // Use new URL parser
            useUnifiedTopology: true,   // Use new server discovery and monitoring engine
            serverSelectionTimeoutMS: 15000, // 15 seconds timeout
            socketTimeoutMS: 45000,     // 45 seconds socket timeout
            bufferCommands: false,      // Disable mongoose buffering
            bufferMaxEntries: 0        // Disable mongoose buffering
        });
        
        console.log("✅ MongoDB connected successfully");
        console.log("📊 Database: Connected to cloud database");
        
        // Test the connection
        const adminDb = mongoose.connection.db.admin();
        const result = await adminDb.ping();
        console.log("🏓 Database ping result:", result);
        
    } catch (err) {
        // If connection fails, log the error and exit the process
        console.error("❌ MongoDB connection error:", err.message);
        console.error("💡 Check your MONGODB_URI environment variable");
        console.error("💡 Make sure your MongoDB Atlas cluster is accessible");
        console.error("💡 Check if your IP is whitelisted in MongoDB Atlas");
        process.exit(1); // Exit with error code 1
    }
}

// Export the connectDB function
module.exports = connectDB;
