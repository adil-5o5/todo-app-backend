const axios = require('axios');

// Test local server
const BASE_URL = 'http://localhost:3000';

async function testLocalServer() {
  console.log('🧪 Testing local server...\n');

  try {
    // Test 1: Health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data);

    // Test 2: Root endpoint
    console.log('\n2. Testing root endpoint...');
    const rootResponse = await axios.get(`${BASE_URL}/`);
    console.log('✅ Root endpoint passed:', rootResponse.data);

    console.log('\n🎉 Local server is working correctly!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure your local server is running with: npm run dev');
    }
  }
}

// Run the test
testLocalServer();
