const ToDoServices = require("../services/todo.service");

/**
 * Create a new todo item
 * POST /todo
 * Body: { userId, title, desc }
 */
exports.createTodo = async (req, res) => {
    try {
        // Extract todo data from request body
        const { userId, title, desc } = req.body;

        // Validate required fields
        if (!userId || !title || !desc) {
            return res.status(400).json({ 
                status: false, 
                message: "userId, title, and desc are required" 
            });
        }

        // Call service to create todo in database
        const todo = await ToDoServices.createTodo(userId, title, desc);

        // Return success response with created todo
        res.json({ status: true, success: todo });
    } catch (error) {
        console.error("❌ Error in creating todo:", error.message);
        res.status(500).json({ status: false, error: error.message });
    }
};

/**
 * Get all todos for a specific user
 * GET /todos?userId=123
 * Query: userId (required)
 */
exports.getTodos = async (req, res) => {
    try {
        // Extract userId from query parameters
        const { userId } = req.query;
        
        // Validate that userId is provided
        if (!userId) {
            return res.status(400).json({ status: false, message: "userId required" });
        }

        // Call service to get todos for this user
        const todos = await ToDoServices.getTodos(userId);
        
        // Return success response with todos array
        res.json({ status: true, data: todos });
    } catch (err) {
        console.error("❌ Error in getting todos:", err.message);
        res.status(500).json({ status: false, error: err.message });
    }
};

/**
 * Delete a specific todo by ID
 * DELETE /deletetodo?id=123
 * Query: id (required) - The todo ID to delete
 */
exports.deleteTodo = async (req, res) => {
    try {
        // Extract todo ID from query parameters
        const { id } = req.query;
        
        // Validate that ID is provided
        if (!id) {
            return res.status(400).json({ status: false, message: "ID required" });
        }

        // Call service to delete todo from database
        await ToDoServices.deleteTodo(id);
        
        // Return success response
        res.json({ status: true, message: "Todo deleted successfully" });
    } catch (err) {
        console.error("❌ Error in deleting todo:", err.message);
        res.status(500).json({ status: false, error: err.message });
    }
};

// Export all controller functions
module.exports = exports;
