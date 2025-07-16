import React from 'react';
import type { Task } from '../../types/task';
import { useNavigate } from 'react-router-dom';
import { deleteTask } from '../../services/taskApi';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  onDelete?: () => void;
  onView?: () => void;
  onEdit?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onView, onEdit }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (onDelete) {
      onDelete();
    } else {
      await deleteTask(task.id);
    }
  };

  const getBadgeClass = (status: string) => {
    switch (status) {
      case 'In Progress':
        return styles.inProgress;
      case 'Done':
        return styles.done;
      default:
        return '';
    }
  };

  return (
    <div
      role="button"
      className={styles.card}
      onClick={() => (onView ? onView() : navigate(`/tasks/${task.id}`))}
      tabIndex={0}
      aria-label={`View details for task: ${task.title}`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onView ? onView() : navigate(`/tasks/${task.id}`);
        }
      }}
    >
      <span className={`${styles.badge} ${getBadgeClass(task.status)}`}>
        {task.status}
      </span>
      <div>
        <h3 className={styles.title}>{task.title}</h3>
        <p className={styles.status}><strong>Status:</strong> {task.status}</p>
        <p className={styles.dueDate}><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
      </div>
      <div className={styles.actions}>
        <button
          onClick={e => { e.stopPropagation(); onView ? onView() : navigate(`/tasks/${task.id}`); }}
          className={styles.viewButton}
        >
          View
        </button>
        <button
          onClick={e => { e.stopPropagation(); onEdit ? onEdit() : navigate(`/edit/${task.id}`); }}
          className={styles.editButton}
        >
          Edit
        </button>
        <button
          onClick={e => { e.stopPropagation(); handleDelete(); }}
          className={styles.deleteButton}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard; 