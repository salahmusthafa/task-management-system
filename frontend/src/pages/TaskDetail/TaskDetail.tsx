import React, { useEffect, useRef } from 'react';
import type { Task } from '../../types/task';
import styles from './TaskDetail.module.css';

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, onClose }) => {
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
        <h2 className={styles.heading}>Task Details</h2>
        <div className={styles.infoRow}>
          <span className={styles.label}>Title:</span>
          <span className={styles.value}>{task.title}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Description:</span>
          <span className={styles.value}>{task.description}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>Status:</span>
          <span className={styles.value}>{task.status}</span>
        </div>
        <div className={`${styles.infoRow} ${styles.lastRow}`}>
          <span className={styles.label}>Due Date:</span>
          <span className={styles.value}>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal; 