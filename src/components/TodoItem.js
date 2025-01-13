import React from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>

      <li key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
  <input
    type="checkbox"
    checked={todo.completed}
    onChange={() => toggleComplete(todo._id)}
  />
  <span>{todo.text}</span>
  <button onClick={() => deleteTodo(todo._id)}>Delete</button>
</li>

    </li>

    
  );
}

export default TodoItem;
