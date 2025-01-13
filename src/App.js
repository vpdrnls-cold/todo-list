import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // 백엔드에서 할 일 목록 가져오기
  useEffect(() => {
    fetch('http://localhost:5000/api/todos')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched todos:', data); // 디버깅 로그
        setTodos(data);
      })
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
    if (!id) {
      console.error('Invalid id:', id);
      return;
    }

    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete todo');
        }
        console.log('Deleted todo with id:', id);
        setTodos(todos.filter((todo) => todo._id !== id));
      })
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

  // 필터링된 할 일
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'uncompleted') return !todo.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('uncompleted')}>Uncompleted</button>
      </div>
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
