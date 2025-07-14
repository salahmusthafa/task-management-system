import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks } from '../services/api';
import type { Task, TaskStatus } from '../types/task';
import TaskCard from '../components/TaskCard';

const statusOptions: TaskStatus[] = ['To Do', 'In Progress', 'Done'];

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'All'>('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  return (
    <div style={{
      maxWidth: 1400,
      margin: '0 auto',
      width: '100%',
    }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        marginBottom: 32,
        width: '100%',
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
          onClick={() => navigate('/create')}
          style={{ background: '#3498db', color: 'white', border: 'none', borderRadius: 4, padding: '0.5rem 1rem', fontSize: 16, cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          + Create Task
        </button>
      </div>
      <div style={{
        display: 'grid',
        gap: 60,
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        width: '100%',
        paddingBottom: 10,
      }}>
        {filteredTasks.length === 0 && !loading && <div>No tasks found.</div>}
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={fetchTasks} minWidth={320} />
        ))}
      </div>
    </div>
  );
};

export default TaskList; 