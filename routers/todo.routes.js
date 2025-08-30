const router = require('express').Router();
const ToDoController = require('../controller/todo.controller');

router.post('/todo', ToDoController.createTodo);
router.get('/todos', ToDoController.getTodos); // <-- fetch all
router.delete('/deletetodo', ToDoController.deleteTodo);

module.exports = router;
