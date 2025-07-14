import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTask } from '../services/api';
import type { Task } from '../types/task';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getTask(Number(id))
        .then(setTask)
        .catch(() => setError('Failed to load task'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!task) return <div>Task not found.</div>;

  return (
    <div style={{
      maxWidth: 500,
      margin: '0 auto',
      background: 'white',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: 32,
      marginTop: 32,
      color: '#222',
    }}>
      <h1 style={{ marginBottom: 24, color: '#222' }}>Task Details</h1>
      <p style={{ marginBottom: 12, color: '#222' }}><strong>Title:</strong> {task.title}</p>
      <p style={{ marginBottom: 12, color: '#222' }}><strong>Description:</strong> {task.description}</p>
      <p style={{ marginBottom: 12, color: '#222' }}><strong>Status:</strong> {task.status}</p>
      <p style={{ marginBottom: 24, color: '#222' }}><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
      <button onClick={() => navigate(-1)} style={{ background: '#e0e0e0', color: '#222', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem', fontSize: 16, cursor: 'pointer' }}>Back</button>
    </div>
  );
};

export default TaskDetail; 