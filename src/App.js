import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoActiveList from './components/TodoActiveList';
import TodoCompletedList from './components/TodoCompletedList';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if (text.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([...todos, newTodo]);
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    if (newText.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      ));
    }
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>📝 Todo App</h1>
          <p>Quản lý công việc của bạn một cách hiệu quả</p>
        </header>
        <TodoForm onAddTodo={addTodo} />
        <h2 style={{marginTop: 20, color: '#4a5568'}}>Đang làm</h2>
        <TodoActiveList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
        />
        <h2 style={{marginTop: 30, color: '#4a5568'}}>Đã hoàn thành</h2>
        <TodoCompletedList
          todos={todos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
        />
        {todos.length > 0 && (
          <div className="todo-stats">
            <span>{completedCount} / {totalCount} hoàn thành</span>
            {completedCount > 0 && (
              <button onClick={clearCompleted} className="clear-btn">
                Xóa đã hoàn thành
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App; 