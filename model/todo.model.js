const mongoose = require('mongoose');
const userModel = require("../model/user.model");

const { Schema } = mongoose;

/**
 * Todo Schema - Defines the structure of todo documents in MongoDB
 * Each todo belongs to a specific user (relationship with User model)
 */
const todoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,  // Reference to User document ID
        ref: userModel.modelName,     // Points to 'User' model
        required: true                // Every todo must belong to a user
    },
    title: {
        type: String,
        required: true,               // Todo title is required
    },
    desc: {
        type: String,
        required: true,               // Todo description is required
    },
}, {
    timestamps: true                  // Automatically add createdAt and updatedAt fields
});

// Export the Todo model
module.exports = mongoose.model('todo', todoSchema);
