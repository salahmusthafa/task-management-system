import React from 'react';
import type { Task } from '../types/task';
import { useNavigate } from 'react-router-dom';
import { deleteTask } from '../services/api';

interface TaskCardProps {
  task: Task;
  onDelete?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task.id);
      if (onDelete) onDelete();
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 16, marginBottom: 8, borderRadius: 4 }}>
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <button onClick={() => navigate(`/tasks/${task.id}`)} style={{ marginTop: 8, marginRight: 8 }}>
        View
      </button>
      <button onClick={() => navigate(`/edit/${task.id}`)} style={{ marginTop: 8, marginRight: 8 }}>
        Edit
      </button>
      <button onClick={handleDelete} style={{ marginTop: 8, background: '#e74c3c', color: 'white' }}>
        Delete
      </button>
    </div>
  );
};

export default TaskCard; 