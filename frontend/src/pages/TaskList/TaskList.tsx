import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, deleteTask as apiDeleteTask } from '../../services/taskApi';
import type { Task, TaskStatus } from '../../types/task';
import TaskCard from '../../components/TaskCard/TaskCard';
import TaskDetailModal from '../TaskDetail/TaskDetail';
import TaskFormModal from '../TaskForm/TaskForm';
import ReactDOM from 'react-dom';
import styles from './TaskList.module.css';

const statusOptions: TaskStatus[] = ['To Do', 'In Progress', 'Done'];

// Custom hook to calculate dynamic page size based on viewport
const useDynamicPageSize = () => {
  const [pageSize, setPageSize] = useState(12);

  const calculatePageSize = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Card dimensions and spacing (based on CSS)
    const cardMinWidth = 280; // minmax(280px, 1fr) from CSS
    const cardHeight = 180; // min-height from TaskCard CSS
    const cardGap = 20; // gap from grid CSS
    const headerHeight = 120; // approximate header height including margins
    const paginationHeight = 80; // approximate pagination height including padding
    const pagePadding = 40; // approximate page padding
    
    // Calculate available space
    const availableHeight = Math.max(0, viewportHeight - headerHeight - paginationHeight - pagePadding);
    const availableWidth = Math.max(0, viewportWidth - pagePadding);
    
    // Calculate how many cards can fit
    let cardsPerRow = Math.floor(availableWidth / (cardMinWidth + cardGap));
    
    // Handle responsive breakpoints from CSS
    if (viewportWidth <= 480) {
      cardsPerRow = 1; // Mobile: single column
    } else if (viewportWidth <= 768) {
      cardsPerRow = Math.max(1, Math.floor(availableWidth / (250 + cardGap))); // Tablet: smaller cards
    } else {
      // For larger screens, calculate based on actual grid behavior
      cardsPerRow = Math.max(1, Math.floor(availableWidth / (cardMinWidth + cardGap)));
    }
    
    const rowsPerView = Math.max(1, Math.floor(availableHeight / (cardHeight + cardGap)));
    const calculatedPageSize = cardsPerRow * rowsPerView;
    
    // For very large screens, allow more cards but cap at a reasonable limit
    const maxPageSize = viewportWidth >= 1920 ? 60 : viewportWidth >= 1440 ? 48 : 36;
    
    // Set the page size (minimum 6, dynamic maximum)
    const finalPageSize = Math.min(Math.max(calculatedPageSize, 6), maxPageSize);
    
    setPageSize(finalPageSize);
  }, []);

  useEffect(() => {
    calculatePageSize();
    
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        calculatePageSize();
      }, 150); // Debounce resize events
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [calculatePageSize]);

  return pageSize;
};

const DeleteTaskModal: React.FC<{ task: Task; onClose: () => void; onDeleted: () => void }> = ({ task, onClose, onDeleted }) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const lastActiveElement = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
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
        <h2 style={{ marginBottom: 16, fontSize: 24, fontWeight: 700, color: '#222' }}>Delete Task</h2>
        <div style={{ marginBottom: 24, fontSize: 17 }}>
          Are you sure you want to delete <b>{task.title}</b>?
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', width: '100%' }}>
          <button
            onClick={onClose}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            onClick={async () => { await apiDeleteTask(task.id); onDeleted(); onClose(); }}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = useDynamicPageSize(); // Use dynamic page size instead of static
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const fetchTasks = () => {
    setLoading(true);
    getTasks(page, pageSize, statusFilter)
      .then((data) => {
        setTasks(data.tasks);
        setTotal(data.total);
        setError(null);
      })
      .catch(() => {
        setError('Failed to load tasks');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize, statusFilter]);

  // Reset to page 1 when filter changes or page size changes
  useEffect(() => {
    setPage(1);
  }, [statusFilter, pageSize]);

  const blurred = selectedTask || editingTask || showCreateModal || deletingTask;
  const blurredContent = (
    <>
      <div className={styles.headerRow} style={{ filter: blurred ? 'blur(4px)' : 'none' }}>
        <h1 className={styles.title}>Task List</h1>
        <div className={styles.filterRow}>
          <label style={{ marginRight: 8, color: '#222', fontWeight: 500 }}>Status Filter:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'All')}
            className={styles.select}
          >
            <option value="All">All</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <span style={{ marginLeft: 16, fontSize: '14px', color: '#666' }}>
            Showing {pageSize} cards per page
          </span>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className={styles.button}
        >
          + Create Task
        </button>
      </div>
      <div className={styles.grid} style={{ filter: blurred ? 'blur(4px)' : 'none' }}>
        {tasks.length === 0 && !loading && <div>No tasks found.</div>}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => setDeletingTask(task)}
            onView={() => setSelectedTask(task)}
            onEdit={() => setEditingTask(task)}
          />
        ))}
      </div>
      {/* Pagination Controls - Only show if there are more items than can fit */}
      {total > pageSize && (
        <div
          className={styles.pagination}
          style={{ filter: blurred ? 'blur(4px)' : 'none' }}
          aria-label="Pagination navigation"
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous Page"
            className={styles.paginationButton}
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(total / pageSize) }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              onClick={() => setPage(pg)}
              aria-current={pg === page ? 'page' : undefined}
              className={styles.paginationButton}
              disabled={pg === page}
            >
              {pg}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= Math.ceil(total / pageSize)}
            aria-label="Next Page"
            className={styles.paginationButton}
          >
            Next
          </button>
        </div>
      )}
    </>
  );

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {blurredContent}
      {selectedTask && ReactDOM.createPortal(
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onEdit={() => {
            setEditingTask(selectedTask);
            setSelectedTask(null);
          }}
          onDelete={() => {
            setDeletingTask(selectedTask);
            setSelectedTask(null);
          }}
        />, document.body
      )}
      {editingTask && ReactDOM.createPortal(
        <TaskFormModal task={editingTask} onClose={() => setEditingTask(null)} onSaved={fetchTasks} />, document.body
      )}
      {showCreateModal && ReactDOM.createPortal(
        <TaskFormModal onClose={() => setShowCreateModal(false)} onSaved={fetchTasks} />, document.body
      )}
      {deletingTask && ReactDOM.createPortal(
        <DeleteTaskModal
          task={deletingTask}
          onClose={() => setDeletingTask(null)}
          onDeleted={fetchTasks}
        />, document.body
      )}
    </div>
  );
};

export default TaskList; 