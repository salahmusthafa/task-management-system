import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, deleteTask as apiDeleteTask } from '../services/api';
import type { Task, TaskStatus } from '../types/task';
import TaskCard from '../components/TaskCard';
import TaskDetailModal from './TaskDetail';
import TaskFormModal from './TaskForm';
import ReactDOM from 'react-dom';

const statusOptions: TaskStatus[] = ['To Do', 'In Progress', 'Done'];

const DeleteTaskModal: React.FC<{ task: Task; onClose: () => void; onDeleted: () => void }> = ({ task, onClose, onDeleted }) => (
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
      <h2 style={{ marginBottom: 16, fontSize: 24, fontWeight: 700, color: '#222' }}>Delete Task</h2>
      <div style={{ marginBottom: 24, fontSize: 17 }}>
        Are you sure you want to delete <b>{task.title}</b>?
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', width: '100%' }}>
        <button
          onClick={onClose}
          style={{ background: '#e0e0e0', color: '#222', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem', fontSize: 16, cursor: 'pointer' }}
        >
          Cancel
        </button>
        <button
          onClick={async () => { await apiDeleteTask(task.id); onDeleted(); onClose(); }}
          style={{ background: '#e74c3c', color: 'white', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem', fontSize: 16, cursor: 'pointer' }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const navigate = useNavigate();

  const fetchTasks = () => {
    setLoading(true);
    getTasks()
      .then((data) => {
        setTasks(data);
        setError(null);
      })
      .catch(() => {
        setError('Failed to load tasks');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = statusFilter === 'All'
    ? tasks
    : tasks.filter((task) => task.status === statusFilter);

  // The content to blur (top bar + grid)
  const blurred = selectedTask || editingTask || showCreateModal || deletingTask;
  const blurredContent = (
    <>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 32,
        width: '100%',
        filter: blurred ? 'blur(4px)' : 'none',
        transition: 'filter 0.2s',
      }}>
        <h1 style={{ margin: 0, color: '#222', flex: '1 1 200px' }}>Task List</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <label style={{ marginRight: 8, color: '#222', fontWeight: 500 }}>Status Filter:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'All')}
            style={{ padding: '0.3rem 0.7rem', borderRadius: 4, border: '1px solid #ccc', fontSize: 15, background: '#fff', color: '#222', appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' }}
          >
            <option value="All">All</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          style={{ background: '#3498db', color: 'white', border: 'none', borderRadius: 4, padding: '0.5rem 1rem', fontSize: 16, cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          + Create Task
        </button>
      </div>
      <div style={{
        display: 'grid',
        gap: '30px 55px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        width: '100%',
        paddingBottom: 10,
        filter: blurred ? 'blur(4px)' : 'none',
        transition: 'filter 0.2s',
      }}>
        {filteredTasks.length === 0 && !loading && <div>No tasks found.</div>}
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => setDeletingTask(task)}
            onView={() => setSelectedTask(task)}
            onEdit={() => setEditingTask(task)}
          />
        ))}
      </div>
    </>
  );

  return (
    <div style={{
      maxWidth: 1400,
      margin: '0 auto',
      width: '100%',
      position: 'relative',
    }}>
      {blurredContent}
      {selectedTask && ReactDOM.createPortal(
        <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />, document.body
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