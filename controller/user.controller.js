const userModel = require("../model/user.model");
const UserService = require("../services/user.service");

/**
 * Register a new user
 * POST /registration
 * Body: { email, password }
 */
exports.register = async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Call service to register user (this will hash the password)
        const user = await UserService.registerUser(email, password);

        // Return success response with user data (password will be hashed)
        res.json({
            status: true,
            message: "✅ User registered successfully",
            data: user
        });

    } catch (err) {
        console.error("❌ Error in register:", err.message);
        res.status(400).json({ status: false, error: err.message });
    }
};

/**
 * Login user and return JWT token
 * POST /login
 * Body: { email, password }
 */
exports.login = async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Check if user exists in database
        const user = await UserService.checkusers(email);
        if (!user) {
            return res.status(400).json({ status: false, message: "User doesn't exist" });
        }

        // Compare provided password with hashed password in database
        const isMatch = await user.comparepassword(password);
        if (!isMatch) {
            return res.status(400).json({ status: false, message: "Invalid password" });
        }

        // Generate JWT token for authentication
        let tokenData = { _id: user._id, email: user.email };
        const token = await UserService.generateToken(tokenData, "secretKey", "1h");

        // Return success response with token and user data
        res.json({
            status: true,
            message: "✅ Login successful",
            token: token,
            data: user
        });

    } catch (err) {
        console.error("❌ Error in Logging In:", err.message);
        res.status(500).json({ status: false, error: err.message });
    }
};

/**
 * Get all users (for admin purposes)
 * GET /users
 */
exports.getUsers = async (req, res) => {
    try {
        // Get all users from database
        const users = await UserService.getAllUsers();
        res.json({ status: true, data: users });
    } catch (err) {
        console.error("❌ Error in getUsers:", err.message);
        res.status(500).json({ status: false, error: err.message });
    }
};

/**
 * Logout user (invalidate token on frontend)
 * GET /logout
 */
exports.logout = async (req, res) => {
    try {
        // Note: In a real app, you might want to blacklist the token
        // For now, we just return success (frontend should clear the token)
        const result = await UserService.logout();
        res.json({ status: true, message: "Logout successful" });

    } catch (err) {
        console.error("❌ Error in Logging Out:", err.message);
        res.status(500).json({ status: false, error: err.message });
    }
};
