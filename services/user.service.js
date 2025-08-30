const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

class UserService {
    /**
     * Register a new user (email + password)
     * @param {string} email - User's email address
     * @param {string} password - User's password (will be hashed)
     * @returns {Object} The created user object
     */
    static async registerUser(email, password) {
        try {
            // Check if user already exists with this email
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                throw new Error("User already exists");
            }

            // Create new user and save to database (password will be hashed automatically)
            const newUser = new userModel({ email, password });
            return await newUser.save();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    /**
     * Get all users from database
     * @returns {Array} Array of all user objects
     */
    static async getAllUsers() {
        try {
            return await userModel.find();
        } catch (err) {
            throw new Error(err.message);
        }
    }

    /**
     * Check if user exists by email (for login)
     * @param {string} email - User's email address
     * @returns {Object|null} User object if found, null if not found
     */
    static async checkusers(email) {
        try {
            return await userModel.findOne({ email });
        } catch (err) {
            throw new Error(err.message);
        }
    }

    /**
     * Logout user (placeholder function)
     * Note: In a real application, you might want to:
     * - Blacklist the JWT token
     * - Store invalidated tokens in Redis/database
     * - For now, frontend should just clear the token
     * @returns {Object} Success message
     */
    static async logout() {
        try {
            // In a real app, you might blacklist the token here
            // For now, just return success (frontend handles token removal)
            return { message: "Logout successful" };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    /**
     * Generate a JWT token for authentication
     * @param {Object} tokenData - Payload data (e.g., userId, email)
     * @param {String} secretKey - Secret key for signing the token
     * @param {String|Number} jwt_expire - Expiry time (e.g., "1h", "7d")
     * @returns {String} JWT token
     */
    static async generateToken(tokenData, secretKey, jwt_expire) {
        return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
    }
}

module.exports = UserService;
