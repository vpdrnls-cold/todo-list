const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }, // createdAt 필드 추가
});

module.exports = mongoose.model('Todo', TodoSchema);
    