# 🚀 Deployment Checklist

## Before Deploying

### 1. Environment Variables Setup
Make sure these are set in your Render dashboard:

```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_here
```

### 2. MongoDB Atlas Setup
- [ ] Database cluster is running
- [ ] Network access allows all IPs (0.0.0.0/0)
- [ ] Database user has read/write permissions
- [ ] Connection string is correct

### 3. Code Changes Made
- [x] Fixed package.json scripts
- [x] Updated CORS configuration for mobile apps
- [x] Added input validation
- [x] Improved error handling
- [x] Added health check endpoint
- [x] Added request logging
- [x] Fixed JWT secret configuration

## After Deploying

### 1. Test Your Server
```bash
# Install axios for testing
npm install axios

# Update the URL in test-api.js with your actual server URL
# Then run:
node test-api.js
```

### 2. Manual API Testing
Test these endpoints in your browser or Postman:

#### Health Check
```
GET https://your-app-name.onrender.com/health
```

#### Registration
```
POST https://your-app-name.onrender.com/registration
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

#### Login
```
POST https://your-app-name.onrender.com/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### 3. Check Render Logs
- Go to your Render dashboard
- Click on your service
- Check the "Logs" tab for any errors

### 4. Common Issues & Solutions

#### Issue: "Cannot connect to database"
**Solution:**
- Check MongoDB connection string
- Verify network access settings
- Ensure database user exists

#### Issue: "CORS error"
**Solution:**
- CORS is now configured to allow all origins
- Check if the error persists

#### Issue: "JWT token invalid"
**Solution:**
- Make sure JWT_SECRET environment variable is set
- Check if the secret is consistent

#### Issue: "User already exists"
**Solution:**
- This is expected behavior
- Try with a different email

## Flutter App Configuration

### Update Your Flutter App
In `lib/services/auth_store.dart`, change:
```dart
static const String baseUrl = 'https://your-actual-app-name.onrender.com';
```

### Test the Flutter App
1. Build the APK: `flutter build apk --release`
2. Install on your phone
3. Try to register/login
4. Test todo operations

## Monitoring

### Check Server Status
- Monitor Render dashboard for uptime
- Check MongoDB Atlas for database performance
- Review logs for any errors

### Performance Tips
- The free tier has limitations
- Monitor your usage
- Consider upgrading if needed

## Troubleshooting Commands

### Test Database Connection
```bash
# Add this to your index.js temporarily
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
```

### Check Environment Variables
```bash
# Add this to your index.js temporarily
console.log('Environment variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');
```

## Success Indicators

✅ Server responds to health check
✅ Registration works
✅ Login works and returns JWT token
✅ Todo operations work
✅ Flutter app can connect
✅ No CORS errors
✅ No database connection errors

If all these pass, your deployment is successful! 🎉
