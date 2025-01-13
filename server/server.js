const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');  // db.js 파일 import
const Todo = require('./models/Todo');  // Todo 모델 import

const app = express();
const port = 5000;

// DB 연결
connectDB();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// GET: 모든 할 일 가져오기
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();  // MongoDB에서 todos 데이터를 가져옵니다
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch todos' });
  }
});

// POST: 새로운 할 일 추가
app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
      completed: false, // 새로 추가되는 할 일의 상태는 기본적으로 false
    });
    await newTodo.save();  // MongoDB에 저장
    res.json(newTodo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add todo' });
  }
});

// PUT: 할 일 상태 업데이트
app.put('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);  // Todo id로 찾아오기
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.completed = req.body.completed;  // completed 상태 업데이트
    await todo.save();  // 변경 사항 저장

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update todo' });
  }
});

// DELETE: 할 일 삭제
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);  // Todo 삭제
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete todo' });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
