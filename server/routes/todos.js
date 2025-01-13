const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

// 모든 할 일 조회
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ message: "Failed to fetch todos" });
    }
});

// 새로운 할 일 추가
router.post('/', async (req, res) => {
    try {
      const { text } = req.body;
      const newTodo = new Todo({
        text,
        completed: false,
        createdAt: new Date(), // 현재 시간 추가
      });
      const savedTodo = await newTodo.save();
      res.json(savedTodo);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create todo' });
    }
  });
  
module.exports = router;
