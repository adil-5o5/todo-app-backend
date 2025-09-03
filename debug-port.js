// Debug script to check environment variables
console.log('🔍 Environment Variable Debug:');
console.log('process.env.PORT:', process.env.PORT);
console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
console.log('process.env.MONGODB_URI:', process.env.MONGODB_URI);
console.log('process.env.JWT_SECRET:', process.env.JWT_SECRET);

// Check if PORT is set anywhere
const port = process.env.PORT || 3000;
console.log('Final port value:', port);
console.log('Type of PORT:', typeof process.env.PORT);

// Check all environment variables that contain 'PORT'
console.log('\n🔍 All env vars containing PORT:');
Object.keys(process.env).forEach(key => {
  if (key.toLowerCase().includes('port')) {
    console.log(`${key}: ${process.env[key]}`);
  }
});
