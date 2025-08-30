const axios = require('axios');

// Replace with your deployed server URL
const BASE_URL = 'https://your-app-name.onrender.com';

async function testAPI() {
  console.log('🧪 Testing Todo API...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data);

    // Test 2: Registration
    console.log('\n2. Testing user registration...');
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = 'password123';
    
    const registerResponse = await axios.post(`${BASE_URL}/registration`, {
      email: testEmail,
      password: testPassword
    });
    console.log('✅ Registration successful:', registerResponse.data);

    // Test 3: Login
    console.log('\n3. Testing user login...');
    const loginResponse = await axios.post(`${BASE_URL}/login`, {
      email: testEmail,
      password: testPassword
    });
    console.log('✅ Login successful:', loginResponse.data);

    const token = loginResponse.data.token;
    const userId = loginResponse.data.data._id;

    // Test 4: Create todo
    console.log('\n4. Testing todo creation...');
    const todoResponse = await axios.post(`${BASE_URL}/todo`, {
      userId: userId,
      title: 'Test Todo',
      desc: 'This is a test todo'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Todo creation successful:', todoResponse.data);

    // Test 5: Get todos
    console.log('\n5. Testing get todos...');
    const todosResponse = await axios.get(`${BASE_URL}/todos?userId=${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Get todos successful:', todosResponse.data);

    console.log('\n🎉 All tests passed! Your API is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    console.error('Status:', error.response?.status);
    console.error('Headers:', error.response?.headers);
  }
}

// Run the test
testAPI();
