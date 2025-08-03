import React, { useEffect, useRef } from 'react';
import type { Task } from '../../types/task';
import styles from './TaskDetail.module.css';

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

function getRelativeDueDate(dueDate: string): { label: string; className?: string } {
  const due = new Date(dueDate);
  const now = new Date();
  const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { label: `Overdue by ${-diff} day${-diff === 1 ? '' : 's'}`, className: styles.overdue };
  if (diff === 0) return { label: 'Due today', className: styles.dueSoon };
  if (diff <= 3) return { label: `Due in ${diff} day${diff === 1 ? '' : 's'}`, className: styles.dueSoon };
  return { label: `Due in ${diff} days`, className: styles.dueDefault };
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, onClose, onEdit, onDelete }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);
  const statusClass =
    task.status === 'To Do'
      ? `${styles.statusBadge} ${styles.statusTodo}`
      : task.status === 'In Progress'
      ? `${styles.statusBadge} ${styles.statusInProgress}`
      : `${styles.statusBadge} ${styles.statusDone}`;
  const dueInfo = task.status !== 'Done' ? getRelativeDueDate(task.dueDate) : null;

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
        <div className={styles.heading}>
          <span className={statusClass}>{task.status}</span>
          Task Details
        </div>
        <div className={styles.infoGrid}>
          <span className={styles.label}>Title:</span>
          <span className={styles.value}>{task.title}</span>
          <span className={styles.label}>Description:</span>
          <span className={styles.value}>{task.description}</span>
          <span className={styles.label}>Status:</span>
          <span className={styles.value}>{task.status}</span>
          <span className={styles.label}>Due Date:</span>
          <span className={styles.value}>
            {new Date(task.dueDate).toLocaleDateString()} {dueInfo && <span className={dueInfo.className}>{dueInfo.label}</span>}
          </span>
        </div>
        {(onEdit || onDelete) && (
          <div className={styles.actionRow}>
            {onEdit && (
              <button className={`${styles.actionButton} ${styles.editButton}`} onClick={onEdit}>
                Edit
              </button>
            )}
            {onDelete && (
              <button className={`${styles.actionButton} ${styles.deleteButton}`} onClick={onDelete}>
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailModal; 