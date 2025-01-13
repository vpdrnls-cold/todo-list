import React, { useState } from 'react';

function TodoForm({ addTodo, isDarkMode }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task"
        className={isDarkMode ? 'dark-mode' : ''}
      />
      <button
        type="submit"
        className={`add-button ${isDarkMode ? 'dark-mode' : ''}`}
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
