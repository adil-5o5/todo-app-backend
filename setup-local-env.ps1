# PowerShell script to set local environment variables
# Run this script before starting your server

Write-Host "🔧 Setting up local environment variables..." -ForegroundColor Green

# Set environment variables for local development
$env:NODE_ENV = "development"
$env:PORT = "3000"
$env:JWT_SECRET = "your_super_secret_jwt_key_here_change_this_in_production"
$env:MONGODB_URI = "mongodb://localhost:27017/todoapp"

Write-Host "✅ Environment variables set:" -ForegroundColor Green
Write-Host "   NODE_ENV: $env:NODE_ENV" -ForegroundColor Yellow
Write-Host "   PORT: $env:PORT" -ForegroundColor Yellow
Write-Host "   JWT_SECRET: $env:JWT_SECRET" -ForegroundColor Yellow
Write-Host "   MONGODB_URI: $env:MONGODB_URI" -ForegroundColor Yellow

Write-Host "🚀 Now you can run: npm run dev" -ForegroundColor Green
Write-Host "⚠️  Remember to change JWT_SECRET in production!" -ForegroundColor Red
