import React from 'react';
import type { Task } from '../types/task';

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.25)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
    }}>
      <div style={{
        background: 'white',
        borderRadius: 12,
        boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
        padding: 32,
        minWidth: 320,
        maxWidth: 420,
        width: '90vw',
        color: '#222',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        position: 'relative',
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'transparent',
            border: 'none',
            fontSize: 22,
            color: '#888',
            cursor: 'pointer',
          }}
          aria-label="Close"
        >
          ×
        </button>
        <h2 style={{ marginBottom: 16, fontSize: 24, fontWeight: 700, color: '#222' }}>Task Details</h2>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontWeight: 600, color: '#555', fontSize: 16 }}>Title:</span>
          <span style={{ marginLeft: 8, fontSize: 17 }}>{task.title}</span>
        </div>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontWeight: 600, color: '#555', fontSize: 16 }}>Description:</span>
          <span style={{ marginLeft: 8, fontSize: 17 }}>{task.description}</span>
        </div>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontWeight: 600, color: '#555', fontSize: 16 }}>Status:</span>
          <span style={{ marginLeft: 8, fontSize: 17 }}>{task.status}</span>
        </div>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontWeight: 600, color: '#555', fontSize: 16 }}>Due Date:</span>
          <span style={{ marginLeft: 8, fontSize: 17 }}>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal; 