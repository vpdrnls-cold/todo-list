import React from 'react';

const TodoList = ({ todos, toggleComplete, deleteTodo, isDarkMode }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo._id}
          className={isDarkMode ? 'dark-mode' : ''}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 15px',
            margin: '10px 0',
            backgroundColor: isDarkMode ? '#2c2c2c' : '#ffffff',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* 왼쪽 영역 */}
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo._id)}
              style={{ marginRight: '10px' }}
            />
            <span
              className={todo.completed ? 'completed' : ''}
              style={{
                marginRight: '10px',
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? 'gray' : 'inherit',
              }}
            >
              {todo.text}
            </span>
            <small
              style={{
                marginLeft: '5px', // 텍스트와 날짜 사이 간격
                fontSize: '0.9rem',
                color: 'gray',
              }}
            >
              ({new Date(todo.createdAt).toLocaleString()})
            </small>
          </div>

          {/* 오른쪽 Delete 버튼 */}
          <button
            className={`delete ${isDarkMode ? 'dark-mode' : ''}`}
            onClick={() => deleteTodo(todo._id)}
            style={{
              marginLeft: '5px', // 버튼과 내용 사이 간격
              backgroundColor: isDarkMode ? '#b660e0' : '#dc3545',
              color: '#ffffff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'background-color 0.3s ease',
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
