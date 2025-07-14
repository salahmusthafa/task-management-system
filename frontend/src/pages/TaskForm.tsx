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
    <div>
      <h1>{isEdit ? 'Edit Task' : 'Create Task'}</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={form.status} onChange={handleChange} required>
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading} style={{ marginTop: 16 }}>
          {loading ? 'Saving...' : isEdit ? 'Update Task' : 'Create Task'}
        </button>
        <button type="button" onClick={() => navigate('/')} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TaskForm; 