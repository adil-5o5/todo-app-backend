const todoModel = require('../model/todo.model');

/**
 * TodoService class - Handles all todo-related database operations
 * This service layer separates business logic from the controller
 */
class ToDoServices {
    /**
     * Create a new todo item
     * @param {string} userId - ID of the user who owns this todo
     * @param {string} title - Title of the todo
     * @param {string} desc - Description of the todo
     * @returns {Object} The created todo object
     */
    static async createTodo(userId, title, desc) {
        try {
            // Create new todo document
            const createTodo = new todoModel({ userId, title, desc });
            
            // Save to database and return the saved document
            return await createTodo.save();
        } catch (err) {
            throw new Error(`Failed to create todo: ${err.message}`);
        }
    }

    /**
     * Get all todos for a specific user
     * @param {string} userId - ID of the user whose todos to retrieve
     * @returns {Array} Array of todo objects for the user
     */
    static async getTodos(userId) {
        try {
            // Find all todos that belong to this user
            return await todoModel.find({ userId });
        } catch (err) {
            throw new Error(`Failed to get todos: ${err.message}`);
        }
    }

    /**
     * Delete a todo by its ID
     * @param {string} id - ID of the todo to delete
     * @returns {Object|null} The deleted todo object or null if not found
     */
    static async deleteTodo(id) {
        try {
            // Find and delete the todo by ID
            return await todoModel.findByIdAndDelete(id);
        } catch (err) {
            throw new Error(`Failed to delete todo: ${err.message}`);
        }
    }
}

module.exports = ToDoServices; 