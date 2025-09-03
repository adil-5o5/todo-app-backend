@echo off
echo 🔧 Setting up local environment variables...

REM Set environment variables for local development
set NODE_ENV=development
set PORT=3000
set JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
set MONGODB_URI=mongodb://localhost:27017/todoapp

echo ✅ Environment variables set:
echo    NODE_ENV: %NODE_ENV%
echo    PORT: %PORT%
echo    JWT_SECRET: %JWT_SECRET%
echo    MONGODB_URI: %MONGODB_URI%

echo 🚀 Now you can run: npm run dev
echo ⚠️  Remember to change JWT_SECRET in production!

pause
