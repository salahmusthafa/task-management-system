import axios from 'axios';
import type { Task } from '../types/task';

const api = axios.create({
  baseURL: '/api', // Adjust if your backend runs on a different port or URL
});

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>('/tasks');
  return response.data;
};

// You can add more API functions (getTask, createTask, updateTask, deleteTask) later

export default api; 