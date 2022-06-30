const express = require('express');
const {
  getAllTodo,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');

const router = express.Router();

router.route('/').get(getAllTodo).post(createTodo);
router.route('/:id').get(getTodo).put(updateTodo).delete(deleteTodo);

module.exports = router;
