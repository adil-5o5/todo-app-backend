# Node.js Server Deployment Guide

## 🚀 Free Hosting Options

### 1. Render (Recommended - Free Tier)

#### Step 1: Prepare Your Project
1. Create a `render.yaml` file in your project root:

```yaml
services:
  - type: web
    name: todo-server
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        value: your_mongodb_connection_string
```

2. Update your `package.json`:
```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

3. Update your database connection in `config/db.js`:
```javascript
const mongoose = require('mongoose');

async function connectDB() {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp';
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB connected successfully");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
```

#### Step 2: Deploy to Render
1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: todo-server
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `NODE_ENV`: production
     - `MONGODB_URI`: your_mongodb_connection_string

#### Step 3: Get Your Server URL
After deployment, you'll get a URL like: `https://your-app-name.onrender.com`

---

### 2. Railway (Alternative - Free Tier)

#### Step 1: Prepare Your Project
1. Create a `railway.json` file:
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE"
  }
}
```

#### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables in the Railway dashboard

---

### 3. Heroku (Alternative - Free Tier Discontinued)

#### Step 1: Prepare Your Project
1. Create a `Procfile`:
```
web: npm start
```

2. Update `package.json`:
```json
{
  "engines": {
    "node": "18.x"
  }
}
```

#### Step 2: Deploy to Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-todo-app

# Add MongoDB addon
heroku addons:create mongolab

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

---

## 🗄️ MongoDB Database Setup

### Option 1: MongoDB Atlas (Free Cloud Database)

#### Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Sign up for free account
3. Create a new cluster (free tier)

#### Step 2: Configure Database
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password
5. Add to your hosting environment variables

#### Step 3: Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)

---

## 📱 Flutter App Configuration

### Update API Base URL

In your Flutter app, update the base URL in `lib/services/auth_store.dart`:

```dart
class AuthStore {
  // Change this to your deployed server URL
  static const String baseUrl = 'https://your-app-name.onrender.com';
  // or
  static const String baseUrl = 'https://your-app-name.railway.app';
}
```

### Build APK

```bash
# Navigate to your Flutter project
cd flutter_todo_app

# Get dependencies
flutter pub get

# Build APK
flutter build apk --release

# The APK will be in: build/app/outputs/flutter-apk/app-release.apk
```

---

## 🔧 Environment Variables Setup

### Required Environment Variables
```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
PORT=3000
```

### Optional Environment Variables
```bash
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=*
```

---

## 🧪 Testing Your Deployment

### 1. Test API Endpoints
```bash
# Test your deployed server
curl https://your-app-name.onrender.com/users

# Test registration
curl -X POST https://your-app-name.onrender.com/registration \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### 2. Test Flutter App
1. Install the APK on your phone
2. Try to register/login
3. Test todo operations

---

## 🔒 Security Considerations

### 1. Environment Variables
- Never commit sensitive data to Git
- Use environment variables for all secrets
- Keep your MongoDB connection string private

### 2. CORS Configuration
Update your `app.js` to allow your Flutter app:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-app-name.onrender.com'],
  credentials: true
}));
```

### 3. Rate Limiting
Add rate limiting to prevent abuse:
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

---

## 📊 Monitoring and Logs

### 1. Render Dashboard
- View logs in real-time
- Monitor performance
- Check deployment status

### 2. MongoDB Atlas
- Monitor database performance
- View connection logs
- Set up alerts

---

## 🚨 Troubleshooting

### Common Issues:

#### 1. Build Failures
- Check your `package.json` scripts
- Ensure all dependencies are listed
- Verify Node.js version compatibility

#### 2. Database Connection Issues
- Verify MongoDB connection string
- Check network access settings
- Ensure database user has proper permissions

#### 3. CORS Errors
- Update CORS configuration
- Check allowed origins
- Verify request headers

#### 4. Environment Variables
- Double-check variable names
- Ensure values are correct
- Restart deployment after changes

---

## 📱 Mobile App Distribution

### Option 1: Direct APK Installation
1. Build APK: `flutter build apk --release`
2. Transfer APK to phone via USB/email
3. Enable "Install from unknown sources" on phone
4. Install APK

### Option 2: Google Play Store (Recommended)
1. Create Google Play Developer account ($25)
2. Build app bundle: `flutter build appbundle --release`
3. Upload to Google Play Console
4. Publish to store

### Option 3: Internal Testing
1. Use Google Play Console internal testing
2. Share APK with specific users
3. Test before public release

---

## 💰 Cost Breakdown

### Free Tier Limits:
- **Render**: 750 hours/month free
- **Railway**: $5 credit/month
- **MongoDB Atlas**: 512MB storage free
- **Heroku**: No longer free

### Paid Options:
- **Render**: $7/month for unlimited
- **Railway**: Pay-as-you-use
- **MongoDB Atlas**: $9/month for 2GB

---

## 🎯 Next Steps

1. **Deploy your server** using one of the free options
2. **Update your Flutter app** with the new server URL
3. **Build and test** the APK on your phone
4. **Monitor** your server performance
5. **Scale** as needed when you have more users

Your todo app will be accessible from anywhere in the world! 🌍
