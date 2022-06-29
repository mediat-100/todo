const express = require('express');
const {
  getAllTodo,
  getTodo,
  createTodo,
  editTodo,
  deleteTodo
} = require('../controllers/todoController');

const router = express.Router();

router.route('/').get(getAllTodo).post(createTodo);
router.route('/:id').get(getTodo).put(editTodo).delete(deleteTodo);

module.exports = router;
