import React from 'react';
import TodoItem from './TodoItem';

const TodoActiveList = ({ todos, onToggleTodo, onDeleteTodo, onEditTodo }) => {
  const activeTodos = todos.filter(todo => !todo.completed);
  if (activeTodos.length === 0) {
    return <div style={{color:'#a0aec0', textAlign:'center', margin:'20px 0'}}>Không có công việc đang làm</div>;
  }
  return (
    <div className="todo-list">
      {activeTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
          onEdit={onEditTodo}
        />
      ))}
    </div>
  );
};

export default TodoActiveList; 