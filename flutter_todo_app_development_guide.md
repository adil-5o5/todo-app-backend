# Flutter Todo App Development Guide

## 🔗 Backend API Endpoints

### Base URL
```
http://localhost:3000
```

### Authentication APIs

#### 1. User Registration
```
POST /registration
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "status": true,
  "message": "✅ User registered successfully",
  "data": {
    "_id": "user_id",
    "email": "user@example.com"
  }
}
```

#### 2. User Login
```
POST /login
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "status": true,
  "message": "✅ Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "user_id",
    "email": "user@example.com"
  }
}
```

#### 3. User Logout
```
GET /logout
Authorization: Bearer jwt_token

Response:
{
  "status": true,
  "message": "Logout successful"
}
```

#### 4. Get All Users (Admin)
```
GET /users
Authorization: Bearer jwt_token

Response:
{
  "status": true,
  "data": [
    {
      "_id": "user_id",
      "email": "user@example.com"
    }
  ]
}
```

### Todo Management APIs

#### 1. Create Todo
```
POST /todo
Authorization: Bearer jwt_token
Content-Type: application/json

Request Body:
{
  "userId": "user_id",
  "title": "Complete Flutter App",
  "desc": "Build a todo app with Node.js backend"
}

Response:
{
  "status": true,
  "success": {
    "_id": "todo_id",
    "userId": "user_id",
    "title": "Complete Flutter App",
    "desc": "Build a todo app with Node.js backend",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 2. Get User Todos
```
GET /todos?userId=user_id
Authorization: Bearer jwt_token

Response:
{
  "status": true,
  "data": [
    {
      "_id": "todo_id",
      "userId": "user_id",
      "title": "Complete Flutter App",
      "desc": "Build a todo app with Node.js backend",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 3. Delete Todo
```
DELETE /deletetodo?id=todo_id
Authorization: Bearer jwt_token

Response:
{
  "status": true,
  "message": "Todo deleted successfully"
}
```

---

## 📱 Flutter Development Prompt

Create a Flutter todo app that connects to the Node.js backend with the following specifications:

### Required Features

#### 1. Authentication System
- User registration with email/password validation
- User login with JWT token storage
- Persistent login (user stays logged in after app restart)
- Secure logout functionality
- Form validation for email and password

#### 2. Todo Management
- Create new todos with title and description
- View all todos for the logged-in user
- Delete todos with confirmation dialog
- Real-time updates after operations
- Empty state when no todos exist

#### 3. UI/UX Requirements
- Minimal black and white theme
- Clean, modern Material Design
- Responsive layout for different screen sizes
- Loading states and error handling
- Smooth navigation between screens
- Custom app bar with logout button

### App Structure
```
lib/
├── main.dart
├── screens/
│   ├── splash_screen.dart (check auth status)
│   ├── signinpage.dart (login screen - first screen)
│   ├── signupscreen.dart (registration)
│   └── homepage.dart (todo management + logout button)
├── services/
│   └── auth_store.dart (authentication & API calls)
└── widgets/
    └── custom_appbar.dart (app bar with logout)
```

### Technical Requirements

#### Dependencies (pubspec.yaml)
```yaml
dependencies:
  flutter:
    sdk: flutter
  http: ^1.1.0
  shared_preferences: ^2.2.2
  provider: ^6.1.1
  cupertino_icons: ^1.0.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0
```

#### Implementation Details

1. **Authentication Service (auth_store.dart)**
   - Handle JWT token storage using SharedPreferences
   - Implement login, register, and logout functions
   - Manage user session state
   - Handle API authentication headers

2. **Splash Screen**
   - Check authentication status on app start
   - Navigate to appropriate screen based on login state
   - Show loading animation during check

3. **Sign In Page**
   - Email and password input fields
   - Form validation
   - Login button with loading state
   - Navigation to sign up page
   - Error message display

4. **Sign Up Page**
   - Email, password, and confirm password fields
   - Form validation including password matching
   - Registration button with loading state
   - Success/error message handling

5. **Home Page**
   - Display user's todos in a list
   - Floating action button to add new todos
   - Delete functionality with confirmation
   - Empty state when no todos exist
   - Loading states for API calls

6. **Custom App Bar**
   - Title display
   - Logout button in top-right corner
   - Consistent black theme

### API Integration Guidelines

#### Error Handling
- Network connection errors
- Invalid credentials (401)
- Server errors (500)
- Token expiration
- Form validation errors

#### Response Handling
- Check `status` field in all responses
- Handle both success and error cases
- Display user-friendly error messages
- Implement retry mechanisms

#### Security Features
- Store JWT tokens securely in SharedPreferences
- Include token in Authorization header for protected routes
- Clear tokens on logout
- Validate user input before sending to API

### UI/UX Guidelines

#### Theme Configuration
```dart
ThemeData(
  primarySwatch: Colors.grey,
  scaffoldBackgroundColor: Colors.white,
  appBarTheme: AppBarTheme(
    backgroundColor: Colors.black,
    foregroundColor: Colors.white,
    elevation: 0,
  ),
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: Colors.black,
      foregroundColor: Colors.white,
      minimumSize: Size(double.infinity, 50),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
      ),
    ),
  ),
)
```

#### Navigation Flow
1. Splash Screen → Check Auth Status
2. Sign In Page → First screen for unauthenticated users
3. Sign Up Page → Registration for new users
4. Home Page → Todo management for authenticated users

### Testing Scenarios

#### Authentication Flow
- New user registration
- Existing user login
- Invalid credentials handling
- Logout functionality
- Persistent login after app restart

#### Todo Management
- Create new todos
- View todo list
- Delete todos
- Handle empty states
- Network error scenarios

#### Error Scenarios
- No internet connection
- Server down
- Invalid API responses
- Token expiration
- Form validation errors

### Production Considerations

#### Performance
- Efficient state management
- Optimized API calls
- Proper memory management
- Fast app startup

#### Security
- Secure token storage
- Input validation
- Error message sanitization
- Network security

#### User Experience
- Smooth animations
- Responsive design
- Accessibility features
- Offline handling

### Code Quality Standards

#### Code Organization
- Separate concerns (UI, business logic, API)
- Consistent naming conventions
- Proper error handling
- Code documentation

#### State Management
- Use Provider for state management
- Minimize widget rebuilds
- Handle loading and error states
- Maintain clean architecture

This guide provides all necessary information to create a production-ready Flutter todo app that integrates seamlessly with your Node.js backend.
