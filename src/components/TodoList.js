import React from 'react';
import './TodoList.css'; // 스타일 파일 임포트

const TodoList = ({ todos, toggleComplete, deleteTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo._id)}
          />
          <span className={todo.completed ? 'completed' : ''}>
            {todo.text} <small>({new Date(todo.createdAt).toLocaleString()})</small>
          </span>
          <button className="delete" onClick={() => deleteTodo(todo._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
