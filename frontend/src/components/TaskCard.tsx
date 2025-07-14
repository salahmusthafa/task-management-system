import React from 'react';
import type { Task } from '../types/task';
import { useNavigate } from 'react-router-dom';
import { deleteTask } from '../services/api';

interface TaskCardProps {
  task: Task;
  onDelete?: () => void;
  onView?: () => void;
  onEdit?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onView, onEdit }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task.id);
      if (onDelete) onDelete();
    }
  };

  return (
    <div
      style={{
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #e0e0e0',
        padding: 20,
        borderRadius: 8,
        background: 'white',
        color: '#222',
        width: '100%',
        minHeight: 180,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'box-shadow 0.2s, transform 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.13)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px) scale(1.01)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        (e.currentTarget as HTMLDivElement).style.transform = 'none';
      }}
    >
      <div>
        <h3 style={{ margin: '0 0 8px 0', color: '#222' }}>{task.title}</h3>
        <p style={{ margin: '0 0 4px 0', color: '#222' }}><strong>Status:</strong> {task.status}</p>
        <p style={{ margin: '0 0 12px 0', color: '#222' }}><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={onView ? onView : () => navigate(`/tasks/${task.id}`)} style={buttonStyle}>
          View
        </button>
        <button onClick={onEdit ? onEdit : () => navigate(`/edit/${task.id}`)} style={{ ...buttonStyle, background: '#f1c40f', color: '#222' }}>
          Edit
        </button>
        <button onClick={handleDelete} style={{ ...buttonStyle, background: '#e74c3c', color: 'white' }}>
          Delete
        </button>
      </div>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  background: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: 4,
  padding: '0.4rem 1rem',
  fontSize: 15,
  cursor: 'pointer',
  marginTop: 8,
  transition: 'background 0.2s',
};

export default TaskCard; 