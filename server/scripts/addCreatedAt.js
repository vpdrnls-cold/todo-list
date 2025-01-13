const mongoose = require('mongoose');
const Todo = require('../models/Todo'); // Todo 모델 임포트

// MongoDB 연결
mongoose.connect('mongodb+srv://wogns:quti7499@cluster0.dtkzk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// 모든 할 일에 createdAt 필드 추가
const addCreatedAtToTodos = async () => {
  try {
    const result = await Todo.updateMany(
      { createdAt: { $exists: false } }, // createdAt 필드가 없는 항목만
      { $set: { createdAt: new Date() } } // 현재 시간 추가
    );
    console.log(`${result.modifiedCount}개의 문서에 createdAt 필드 추가 완료`);
    mongoose.disconnect(); // 연결 종료
  } catch (error) {
    console.error('Error adding createdAt:', error);
    mongoose.disconnect(); // 오류 발생 시에도 연결 종료
  }
};

addCreatedAtToTodos();
