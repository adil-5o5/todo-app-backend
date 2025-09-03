// Test MongoDB Atlas connection
const mongoose = require('mongoose');

// Your MongoDB Atlas connection string (password encoded: @ becomes %40)
const mongoURI = 'mongodb+srv://adil:Adil%402005@cluster1.vh0gvd7.mongodb.net/todoapp?retryWrites=true&w=majority';

console.log('🧪 Testing MongoDB Atlas connection...');
console.log('🔌 URI:', mongoURI.includes('mongodb+srv') ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB');

async function testConnection() {
    try {
        console.log('🔌 Attempting to connect...');
        
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 15000,
            socketTimeoutMS: 45000
        });
        
        console.log('✅ MongoDB Atlas connected successfully!');
        console.log('📊 Database: todoapp');
        
        // Test creating a collection
        const db = mongoose.connection.db;
        const collections = await db.listCollections().toArray();
        console.log('📚 Collections found:', collections.length);
        
        await mongoose.disconnect();
        console.log('🔌 Disconnected successfully');
        
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err.message);
        console.error('💡 Check your username, password, and cluster name');
        console.error('💡 Make sure your IP is whitelisted in MongoDB Atlas');
    }
}

testConnection();
