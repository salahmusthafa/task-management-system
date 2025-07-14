import React from 'react';
import type { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: 16, marginBottom: 8, borderRadius: 4 }}>
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
    </div>
  );
};

export default TaskCard; 