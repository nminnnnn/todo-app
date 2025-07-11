import React from 'react';
import TodoItem from './TodoItem';

const TodoCompletedList = ({ todos, onToggleTodo, onDeleteTodo, onEditTodo }) => {
  const completedTodos = todos.filter(todo => todo.completed);
  if (completedTodos.length === 0) {
    return <div style={{color:'#a0aec0', textAlign:'center', margin:'20px 0'}}>Chưa có công việc hoàn thành</div>;
  }
  return (
    <div className="todo-list">
      {completedTodos.map(todo => (
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

export default TodoCompletedList; 