const axios = require('axios');

// Your actual deployed server URL
const BASE_URL = 'https://todo-app-backend-znw7.onrender.com';

async function testDeployedServer() {
  console.log('🔍 Testing deployed server endpoints...\n');

  try {
    // Test 1: Root endpoint
    console.log('1. Testing root endpoint...');
    try {
      const rootResponse = await axios.get(`${BASE_URL}/`);
      console.log('✅ Root endpoint works:', rootResponse.data);
    } catch (error) {
      console.log('❌ Root endpoint failed:', error.response?.status);
    }

    // Test 2: Try to find available endpoints
    console.log('\n2. Testing common endpoints...');
    
    const endpoints = [
      '/health',
      '/api',
      '/v1',
      '/users',
      '/registration',
      '/login'
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await axios.get(`${BASE_URL}${endpoint}`);
        console.log(`✅ ${endpoint} works:`, response.status);
      } catch (error) {
        if (error.response?.status === 404) {
          console.log(`❌ ${endpoint} not found (404)`);
        } else if (error.response?.status === 405) {
          console.log(`⚠️  ${endpoint} exists but wrong method (405)`);
        } else {
          console.log(`❌ ${endpoint} error:`, error.response?.status);
        }
      }
    }

    // Test 3: Test POST endpoints
    console.log('\n3. Testing POST endpoints...');
    
    try {
      const registerResponse = await axios.post(`${BASE_URL}/registration`, {
        email: 'test@example.com',
        password: 'password123'
      });
      console.log('✅ Registration endpoint works');
    } catch (error) {
      if (error.response?.status === 400 && error.response.data?.error === 'User already exists') {
        console.log('✅ Registration endpoint works (user already exists)');
      } else {
        console.log('❌ Registration endpoint failed:', error.response?.status, error.response?.data);
      }
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testDeployedServer();
