const router = require('express').Router();
const UserController = require("../controller/user.controller");

// POST /registration - Register a new user
router.post('/registration', UserController.register);

// POST /login - Login user and get JWT token
router.post('/login', UserController.login);

// GET /users - Get all users (for admin purposes)
router.get('/users', UserController.getUsers);

// GET /logout - Logout user (invalidate token on frontend)
router.get('/logout', UserController.logout);

module.exports = router;
