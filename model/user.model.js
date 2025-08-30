const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

/**
 * User Schema - Defines the structure of user documents in MongoDB
 * This schema handles user registration and authentication
 */
const userSchema = new Schema({
    email: {
        type: String,
        required: true,        // Email is required
        lowercase: true,       // Convert email to lowercase
        unique: true,          // Email must be unique in database
    },
    password: {
        type: String,
        required: true         // Password is required
    }
});

/**
 * Pre-save middleware - Runs before saving user to database
 * This automatically hashes the password before saving
 */
userSchema.pre('save', async function () {
    try {
        // Only hash password if it's modified (or new)
        if (!this.isModified('password')) return;

        // Generate salt for password hashing (10 rounds)
        const salt = await bcrypt.genSalt(10);
        
        // Hash the password with the salt
        this.password = await bcrypt.hash(this.password, salt);

    } catch (err) {
        throw err; // Re-throw the error
    }
});

/**
 * Instance method to compare password during login
 * @param {string} userpassword - Plain text password from login form
 * @returns {boolean} - True if password matches, false otherwise
 */
userSchema.methods.comparepassword = async function (userpassword) {
    try {
        // Compare plain text password with hashed password in database
        const isMatch = await bcrypt.compare(userpassword, this.password);
        return isMatch;

    } catch (err) {
        // If there's an error during comparison, throw it
        throw new Error("Password comparison failed");
    }
}

// Export the User model
module.exports = mongoose.model('User', userSchema);
