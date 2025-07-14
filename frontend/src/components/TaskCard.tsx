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

const statusColor = {
  'To Do': { bg: '#e0e0e0', text: '#222' },
  'In Progress': { bg: '#ffe082', text: '#b26a00' },
  'Done': { bg: '#b9f6ca', text: '#00695c' },
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onView, onEdit }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (onDelete) {
      onDelete();
    } else {
      await deleteTask(task.id);
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
      <span
        style={{
          display: 'inline-block',
          padding: '2px 12px',
          borderRadius: 12,
          fontSize: 13,
          fontWeight: 600,
          color: statusColor[task.status].text,
          background: statusColor[task.status].bg,
          marginBottom: 8,
          alignSelf: 'flex-start',
        }}
      >
        {task.status}
      </span>
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