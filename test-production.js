// Production test script
// This simulates production environment variables

// Set production environment
process.env.NODE_ENV = 'production';
process.env.PORT = '10000';
process.env.JWT_SECRET = 'test_jwt_secret_for_production_testing';
process.env.MONGODB_URI = 'mongodb+srv://test:test@test.mongodb.net/todoapp';

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
