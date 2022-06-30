const Todo = require('../models/todo');

exports.getAllTodo = async (req, res) => {
  try {
    const { page = 1, limit = 3 } = req.query;

    const todos = await Todo.find()
      .skip((page - 1) * limit)
      .limit(limit * 1);

    // get total count of todos in DB
    const count = await Todo.countDocuments();

    return res.status(200).json({
      status: 'success',
      total: count,
      todo: todos,
      totalPages: Math.ceil(count / limit),
      currentPage: page * 1,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      error: err,
    });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const existingTodo = await Todo.findById(req.params.id);

    if (!existingTodo) throw new Error('Todo not found!!!');

    return res.status(200).json({
      status: 'success',
      todo: existingTodo,
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      msg: err.message,
      error: err,
    });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const existingTodo = await Todo.findOne({ title: req.body.title });

    if (existingTodo) throw new Error('Todo already exist!');

    const newTodo = await Todo.create(req.body);

    return res.status(200).json({
      status: 'success',
      msg: 'Todo created successfully...',
      todo: newTodo,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      msg: err.message,
      error: err,
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const existingTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!existingTodo) throw new Error('Todo not found!');

    return res.status(200).json({
      status: 'success',
      msg: 'Todo updated successfully...',
      todo: existingTodo,
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      msg: err.message,
      error: err,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const existingTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!existingTodo) throw new Error('Todo not found!!!');

    return res.status(200).json({
      status: 'success',
      msg: 'Todo deleted successfully...',
    });
  } catch (err) {
    return res.status(404).json({
      status: 'fail',
      msg: err.message,
      error: err,
    });
  }
};
