import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Task, TaskStatus } from '../types/task';
import { createTask, updateTask, getTask } from '../services/api';

const statusOptions: TaskStatus[] = ['To Do', 'In Progress', 'Done'];

const TaskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    status: 'To Do',
    dueDate: new Date().toISOString().slice(0, 10),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      getTask(Number(id))
        .then((task) => {
          setForm({
            title: task.title,
            description: task.description,
            status: task.status as TaskStatus,
            dueDate: task.dueDate.slice(0, 10),
          });
        })
        .catch(() => setError('Failed to load task'))
        .finally(() => setLoading(false));
    }
  }, [isEdit, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEdit && id) {
        await updateTask(Number(id), form);
      } else {
        await createTask(form);
      }
      navigate('/');
    } catch {
      setError('Failed to save task');
    } finally {
      setLoading(false);
    }
  };

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
      <h1 style={{ marginBottom: 24, color: '#222' }}>{isEdit ? 'Edit Task' : 'Create Task'}</h1>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Title:</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', fontSize: 15, background: 'white', color: '#222' }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Description:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', fontSize: 15, minHeight: 80, background: 'white', color: '#222' }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Status:</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', fontSize: 15, background: '#fff', color: '#222', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' }}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 4 }}>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', fontSize: 15, background: 'white', color: '#222' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={loading} style={{ background: '#3498db', color: 'white', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem', fontSize: 16, cursor: 'pointer' }}>
            {loading ? 'Saving...' : isEdit ? 'Update Task' : 'Create Task'}
          </button>
          <button type="button" onClick={() => navigate('/')} style={{ background: '#e0e0e0', color: '#222', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem', fontSize: 16, cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm; 