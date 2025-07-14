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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ margin: 0, color: '#222' }}>Task List</h1>
        <div>
          <label style={{ marginRight: 8 }}>Status Filter:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'All')}
            style={{ padding: '0.3rem 0.7rem', borderRadius: 4, border: '1px solid #ccc', fontSize: 15 }}
          >
            <option value="All">All</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <button onClick={() => navigate('/create')} style={{ background: '#3498db', color: 'white', border: 'none', borderRadius: 4, padding: '0.5rem 1rem', fontSize: 16, cursor: 'pointer' }}>
          + Create Task
        </button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div style={{
        display: 'grid',
        gap: 24,
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        width: '100%',
        paddingBottom: 32,
      }}>
        {filteredTasks.length === 0 && !loading && <div>No tasks found.</div>}
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={fetchTasks} />
        ))}
      </div>
    </div>
  );
};

export default TaskList; 