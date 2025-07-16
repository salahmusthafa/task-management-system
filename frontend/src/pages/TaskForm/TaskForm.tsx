import React, { useEffect, useRef } from 'react';
import type { Task, TaskStatus } from '../../types/task';
import { createTask, updateTask, getTask } from '../../services/api';
import styles from './TaskForm.module.css';

interface TaskFormModalProps {
  task?: Task;
  onClose: () => void;
  onSaved?: () => void;
}

const statusOptions: TaskStatus[] = ['To Do', 'In Progress', 'Done'];

const validate = (values: Omit<Task, 'id'>) => {
  const errors: Partial<Record<keyof Omit<Task, 'id'>, string>> = {};
  if (!values.title || values.title.trim().length < 3) {
    errors.title = 'Title is required (min 3 chars)';
  }
  if (!values.description || values.description.trim().length < 5) {
    errors.description = 'Description is required (min 5 chars)';
  }
  if (!values.status || !statusOptions.includes(values.status as TaskStatus)) {
    errors.status = 'Status is required';
  }
  if (!values.dueDate) {
    errors.dueDate = 'Due date is required';
  }
  return errors;
};

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
  const [formErrors, setFormErrors] = React.useState<Partial<Record<keyof Omit<Task, 'id'>, string>>>({});
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
    setError(null);
    const validationErrors = validate(form);
    setFormErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    setLoading(true);
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
    <div className={styles.modal} onClick={onClose}>
      <div
        ref={modalRef}
        tabIndex={-1}
        className={styles.modalContent}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className={styles.heading}>{isEdit ? 'Edit Task' : 'Create Task'}</h2>
        {error && <div className={styles.error} style={{ marginBottom: 12 }}>{error}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title:</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className={styles.input}
            />
            {formErrors.title && <div className={styles.error}>{formErrors.title}</div>}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Description:</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className={styles.textarea}
            />
            {formErrors.description && <div className={styles.error}>{formErrors.description}</div>}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Status:</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
              className={styles.select}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            {formErrors.status && <div className={styles.error}>{formErrors.status}</div>}
          </div>
          <div className={styles.formGroup} style={{ marginBottom: 18 }}>
            <label className={styles.label}>Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              required
              className={styles.input}
            />
            {formErrors.dueDate && <div className={styles.error}>{formErrors.dueDate}</div>}
          </div>
          <div className={styles.actionRow}>
            <button type="submit" disabled={loading} className={styles.button}>
              {loading ? 'Saving...' : isEdit ? 'Update Task' : 'Create Task'}
            </button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal; 