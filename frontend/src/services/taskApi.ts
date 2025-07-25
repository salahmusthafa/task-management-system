import axios from 'axios';
import type { Task, PaginatedTasksResponse } from '../types/task';

const api = axios.create({
  baseURL: 'http://localhost:5168/api', // Use the backend's URL
});

export const getTasks = async (page = 1, pageSize = 10, status?: string): Promise<PaginatedTasksResponse> => {
  let url = `/tasks?page=${page}&pageSize=${pageSize}`;
  if (status && status !== 'All') {
    url += `&status=${encodeURIComponent(status)}`;
  }
  const response = await api.get<PaginatedTasksResponse>(url);
  return response.data;
};

export const getTask = async (id: number): Promise<Task> => {
  const response = await api.get<Task>(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await api.post<Task>('/tasks', task);
  return response.data;
};

export const updateTask = async (id: number, task: Omit<Task, 'id'>): Promise<void> => {
  await api.put(`/tasks/${id}`, task);
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

export default api; 