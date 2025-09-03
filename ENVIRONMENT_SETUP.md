# 🌍 Environment Variables Setup Guide

## 🔑 **Required Environment Variables for Production:**

### **1. Server Configuration:**
```bash
NODE_ENV=production
PORT=3000
```

### **2. Database Connection:**
```bash
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/todoapp
```

### **3. Authentication:**
```bash
JWT_SECRET=your_super_secret_jwt_key_here
```

## 🗄️ **MongoDB Atlas Setup:**

### **Step 1: Create MongoDB Atlas Account**
1. Go to [mongodb.com](https://mongodb.com)
2. Sign up for free account
3. Create a new project

### **Step 2: Create Cluster**
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select cloud provider (AWS, Google Cloud, or Azure)
4. Choose region closest to your users
5. Click "Create"

### **Step 3: Database Access**
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username and password (save these!)
5. Select "Read and write to any database"
6. Click "Add User"

### **Step 4: Network Access**
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. For Render deployment, add: `0.0.0.0/0` (allows all IPs)
4. Click "Confirm"

### **Step 5: Get Connection String**
1. Go to "Database" in left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<username>`, `<password>`, and `<dbname>` with your values

## 🚀 **Render Deployment Setup:**

### **Step 1: Update render.yaml**
Replace the placeholder values in `render.yaml`:
```yaml
- key: MONGODB_URI
  value: mongodb+srv://YOUR_ACTUAL_USERNAME:YOUR_ACTUAL_PASSWORD@YOUR_ACTUAL_CLUSTER.mongodb.net/todoapp
```

### **Step 2: Deploy**
1. **Commit and push your changes:**
   ```bash
   git add .
   git commit -m "Fix production environment and database connection issues"
   git push origin main
   ```

2. **Go to [render.com](https://render.com)**
3. **Connect your GitHub repository**
4. **Render will auto-deploy using your `render.yaml`**

### **Step 3: Verify Deployment**
After deployment, test your endpoints:
```bash
node test-deployed-server.js
```

## 🚨 **Common Render Deployment Issues:**

### **Issue 1: "nothing to commit, working tree clean"**
**Cause:** No changes detected by Git
**Solution:** 
```bash
# Check status
git status

# If no changes, make a small change and commit
echo "# Updated $(date)" >> README.md
git add .
git commit -m "Update deployment configuration"
git push origin main
```

### **Issue 2: Database Connection Failed**
**Cause:** Invalid MONGODB_URI or network access
**Solution:**
1. Check MongoDB Atlas IP whitelist (add `0.0.0.0/0`)
2. Verify username/password in connection string
3. Ensure cluster is running

### **Issue 3: Port Already in Use**
**Cause:** Render expects port 10000, not 3000
**Solution:** Use `PORT: 10000` in render.yaml (already fixed)

## 🧪 **Testing Your Setup:**

### **Local Testing:**
```bash
# Set environment variables locally
$env:MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/todoapp"
$env:JWT_SECRET="your_secret_key"
$env:NODE_ENV="development"

# Start server
npm run dev

# Test endpoints
node test-local.js
```

### **Production Testing:**
```bash
# Test deployed server
node test-deployed-server.js
```

## 🔒 **Security Notes:**
- Never commit real credentials to Git
- Use strong, unique JWT secrets
- Restrict MongoDB network access in production
- Regularly rotate JWT secrets
- Monitor database access logs

## 📱 **Flutter App Configuration:**
Update your Flutter app's base URL to:
```dart
static const String baseUrl = 'https://your-app-name.onrender.com';
```
