// Production test script
// This simulates production environment variables

// Set production environment
process.env.NODE_ENV = 'production';
process.env.PORT = '10000';
process.env.JWT_SECRET = '8353d26e0750e7e36caac8af7398b06c2f9fe91694aec24273b6bcedb49bbc857c4df04df36989669d06f6e0abc37fdfd266a09ffe65eaf86dd742b578e1aa54';
process.env.MONGODB_URI = 'mongodb+srv://adil:Adil@2005@cluster1.vh0gvd7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';

console.log('🧪 Testing production environment...');
console.log('🌍 NODE_ENV:', process.env.NODE_ENV);
console.log('🚪 PORT:', process.env.PORT);
console.log('🗄️  MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Missing');
console.log('🔑 JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');

// Test the server startup (will fail due to invalid MongoDB URI, but that's expected)
try {
    const app = require('./app');
    console.log('✅ App loaded successfully');
    console.log('✅ Production environment test passed!');
} catch (error) {
    console.error('❌ App loading failed:', error.message);
}

// Reset environment
delete process.env.NODE_ENV;
delete process.env.PORT;
delete process.env.JWT_SECRET;
delete process.env.MONGODB_URI;
