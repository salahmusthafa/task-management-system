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
      <h1>Task List</h1>
      <button onClick={() => navigate('/create')} style={{ marginBottom: 16 }}>
        + Create Task
      </button>
      <div style={{ marginBottom: 16 }}>
        <label>Status Filter: </label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'All')}
        >
          <option value="All">All</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        {filteredTasks.length === 0 && !loading && <div>No tasks found.</div>}
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={fetchTasks} />
        ))}
      </div>
    </div>
  );
};

export default TaskList; 