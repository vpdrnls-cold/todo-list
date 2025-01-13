import React from 'react';
import './TodoList.css';

const TodoList = ({ todos, toggleComplete, deleteTodo, isDarkMode }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id} className={isDarkMode ? 'dark-mode' : ''}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo._id)}
          />
          <span className={todo.completed ? `completed ${isDarkMode ? 'dark-mode' : ''}` : ''}>
            {todo.text}
          </span>
          <button className={`delete ${isDarkMode ? 'dark-mode' : ''}`} onClick={() => deleteTodo(todo._id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
