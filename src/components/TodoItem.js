import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() !== '') {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        
        {isEditing ? (
          <div className="edit-mode">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="edit-input"
              autoFocus
            />
            <div className="edit-buttons">
              <button onClick={handleEdit} className="save-btn">
                💾
              </button>
              <button onClick={handleCancel} className="cancel-btn">
                ❌
              </button>
            </div>
          </div>
        ) : (
          <div className="todo-text-container">
            <span className="todo-text">{todo.text}</span>
            <div className="todo-actions">
              <button
                onClick={() => setIsEditing(true)}
                className="edit-btn"
                title="Chỉnh sửa"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="delete-btn"
                title="Xóa"
              >
                🗑️
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="todo-date">
        {new Date(todo.createdAt).toLocaleDateString('vi-VN')}
      </div>
    </div>
  );
};

export default TodoItem; 