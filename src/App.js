import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]); // 할 일 목록
  const [filter, setFilter] = useState('all'); // 필터 상태
  const [isDarkMode, setIsDarkMode] = useState(false); // 다크모드 상태

  // 다크모드 초기화
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
  }, []);

  useEffect(() => {
    // 다크모드에 따라 body 클래스 설정
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // 다크모드 상태 변경 시 localStorage 저장
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  // 백엔드에서 할 일 목록 가져오기
  useEffect(() => {
    fetch('http://localhost:5000/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  // 새로운 할 일 추가
  const addTodo = (text) => {
    fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((newTodo) => setTodos([...todos, newTodo]))
      .catch((error) => console.error('Error adding todo:', error));
  };

  // 할 일 삭제
  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => setTodos(todos.filter((todo) => todo._id !== id)))
      .catch((error) => console.error('Error deleting todo:', error));
  };

  // 완료 상태 토글
  const toggleComplete = (id) => {
    const todo = todos.find((t) => t._id === id);
    if (!todo) {
      console.error(`Todo with id ${id} not found.`);
      return;
    }

    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    })
      .then((res) => res.json())
      .then((updatedTodo) =>
        setTodos(
          todos.map((t) => (t._id === updatedTodo._id ? updatedTodo : t))
        )
      )
      .catch((error) => console.error('Error updating todo:', error));
  };

  // 필터링된 할 일 목록
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'uncompleted') return !todo.completed;
    return true;
  });

  // 다크모드 토글
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* 다크모드 토글 버튼 */}
      <div className="theme-toggle">
        {isDarkMode ? (
          <span
            role="button"
            onClick={toggleDarkMode}
            className="theme-icon"
            title="Switch to Light Mode"
          >
            ☀️
          </span>
        ) : (
          <span
            role="button"
            onClick={toggleDarkMode}
            className="theme-icon"
            title="Switch to Dark Mode"
          >
            🌙
          </span>
        )}
      </div>

      {/* 제목 */}
      <h1 className={`title ${isDarkMode ? 'dark-mode' : ''}`}>Todo List</h1>

      {/* 할 일 추가 */}
      <div className={`todo-box ${isDarkMode ? 'dark-mode' : ''}`}>
        <TodoForm addTodo={addTodo} isDarkMode={isDarkMode} />
      </div>

      {/* 필터 버튼 */}
      <div className="filter-buttons">
        <button
          className={`filter-button ${isDarkMode ? 'dark-mode' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-button ${isDarkMode ? 'dark-mode' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button
          className={`filter-button ${isDarkMode ? 'dark-mode' : ''}`}
          onClick={() => setFilter('uncompleted')}
        >
          Uncompleted
        </button>
      </div>

      {/* 할 일 목록 */}
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default App;
