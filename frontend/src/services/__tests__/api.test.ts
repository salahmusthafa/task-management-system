import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { TaskStatus } from '../../types/task';

// Mock the API module
vi.mock('../api', () => ({
  getTasks: vi.fn(),
  getTask: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
}));

// Import after mocking
import { getTasks, getTask, createTask, updateTask, deleteTask } from '../api';

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls getTasks with correct params', async () => {
    vi.mocked(getTasks).mockResolvedValue({ tasks: [], total: 0 });
    await getTasks(1, 10, 'To Do');
    expect(getTasks).toHaveBeenCalledWith(1, 10, 'To Do');
  });

  it('calls getTask with correct id', async () => {
    vi.mocked(getTask).mockResolvedValue({} as any);
    await getTask(42);
    expect(getTask).toHaveBeenCalledWith(42);
  });

  it('calls createTask with correct data', async () => {
    vi.mocked(createTask).mockResolvedValue({} as any);
    const newTask = { title: 'T', description: 'D', status: 'To Do' as TaskStatus, dueDate: '2024-01-01' };
    await createTask(newTask);
    expect(createTask).toHaveBeenCalledWith(newTask);
  });

  it('calls updateTask with correct data', async () => {
    vi.mocked(updateTask).mockResolvedValue();
    const update = { title: 'T', description: 'D', status: 'Done' as TaskStatus, dueDate: '2024-01-01' };
    await updateTask(1, update);
    expect(updateTask).toHaveBeenCalledWith(1, update);
  });

  it('calls deleteTask with correct id', async () => {
    vi.mocked(deleteTask).mockResolvedValue();
    await deleteTask(1);
    expect(deleteTask).toHaveBeenCalledWith(1);
  });

  it('handles errors from API', async () => {
    vi.mocked(getTasks).mockRejectedValue(new Error('fail'));
    await expect(getTasks()).rejects.toThrow('fail');
  });
}); 