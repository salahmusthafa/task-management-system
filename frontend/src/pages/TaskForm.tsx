import React, { useEffect, useRef } from 'react';
import type { Task, TaskStatus } from '../types/task';
import { createTask, updateTask, getTask } from '../services/api';

interface TaskFormModalProps {
  task?: Task;
  onClose: () => void;
  onSaved?: () => void;
}

const statusOptions: TaskStatus[] = ['To Do', 'In Progress', 'Done'];

const TaskFormModal: React.FC<TaskFormModalProps> = ({ task, onClose, onSaved }) => {
  const isEdit = !!task;
  const [form, setForm] = React.useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    status: 'To Do',
    dueDate: new Date().toISOString().slice(0, 10),
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    lastActiveElement.current = document.activeElement as HTMLElement;
    modalRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      lastActiveElement.current?.focus();
    };
  }, [onClose]);

  useEffect(() => {
    if (isEdit && task) {
      setForm({
        title: task.title,
        description: task.description,
        status: task.status as TaskStatus,
        dueDate: task.dueDate.slice(0, 10),
      });
    }
  }, [isEdit, task]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEdit && task) {
        await updateTask(task.id, form);
      } else {
        await createTask(form);
      }
      if (onSaved) onSaved();
      onClose();
    } catch {
      setError('Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
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
      }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        style={{
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
        }}
        onClick={e => e.stopPropagation()}
      >
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
        <h2 style={{ marginBottom: 16, fontSize: 24, fontWeight: 700, color: '#222' }}>{isEdit ? 'Edit Task' : 'Create Task'}</h2>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: 12 }}>
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
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 4 }}>Description:</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', fontSize: 15, minHeight: 60, background: 'white', color: '#222' }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
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
          <div style={{ marginBottom: 18 }}>
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
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button type="submit" disabled={loading} style={{ background: '#3498db', color: 'white', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem', fontSize: 16, cursor: 'pointer' }}>
              {loading ? 'Saving...' : isEdit ? 'Update Task' : 'Create Task'}
            </button>
            <button type="button" onClick={onClose} style={{ background: '#e0e0e0', color: '#222', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem', fontSize: 16, cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal; 