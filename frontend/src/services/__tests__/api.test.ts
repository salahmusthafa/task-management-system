import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as apiModule from '../api'
import type { Task, PaginatedTasksResponse } from '../../types/task'

// Helper to mock api methods
const mockApi = (overrides: Partial<typeof apiModule.default> = {}) => {
  Object.assign(apiModule.default, {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    ...overrides,
  })
}

describe('API Service', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    mockApi() // reset all mocks
  })

  describe('getTasks', () => {
    it('fetches tasks with default pagination', async () => {
      const mockResponse: PaginatedTasksResponse = {
        tasks: [
          { id: 1, title: 'Task 1', description: 'Desc 1', status: 'To Do', dueDate: '2024-01-15T10:00:00Z' },
          { id: 2, title: 'Task 2', description: 'Desc 2', status: 'Done', dueDate: '2024-01-16T10:00:00Z' }
        ],
        total: 2
      }
      mockApi({ get: vi.fn().mockResolvedValue({ data: mockResponse }) })
      const result = await apiModule.getTasks()
      expect(result).toEqual(mockResponse)
    })

    it('fetches tasks with custom pagination and status filter', async () => {
      const mockResponse: PaginatedTasksResponse = {
        tasks: [{ id: 1, title: 'Task 1', description: 'Desc 1', status: 'To Do', dueDate: '2024-01-15T10:00:00Z' }],
        total: 1
      }
      const mockGet = vi.fn().mockResolvedValue({ data: mockResponse })
      mockApi({ get: mockGet })
      await apiModule.getTasks(2, 5, 'To Do')
      expect(mockGet).toHaveBeenCalledWith('/tasks?page=2&pageSize=5&status=To%20Do')
    })

    it('handles "All" status filter correctly', async () => {
      const mockGet = vi.fn().mockResolvedValue({ data: { tasks: [], total: 0 } })
      mockApi({ get: mockGet })
      await apiModule.getTasks(1, 10, 'All')
      expect(mockGet).toHaveBeenCalledWith('/tasks?page=1&pageSize=10')
    })

    it('handles API errors', async () => {
      const mockGet = vi.fn().mockRejectedValue(new Error('Network error'))
      mockApi({ get: mockGet })
      await expect(apiModule.getTasks()).rejects.toThrow('Network error')
    })
  })

  describe('getTask', () => {
    it('fetches a single task by ID', async () => {
      const mockTask: Task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        status: 'To Do',
        dueDate: '2024-01-15T10:00:00Z'
      }
      const mockGet = vi.fn().mockResolvedValue({ data: mockTask })
      mockApi({ get: mockGet })
      const result = await apiModule.getTask(1)
      expect(result).toEqual(mockTask)
      expect(mockGet).toHaveBeenCalledWith('/tasks/1')
    })
  })

  describe('createTask', () => {
    it('creates a new task', async () => {
      const newTask = {
        title: 'New Task',
        description: 'New Description',
        status: 'To Do' as const,
        dueDate: '2024-01-15T10:00:00Z'
      }
      const createdTask: Task = { id: 1, ...newTask }
      const mockPost = vi.fn().mockResolvedValue({ data: createdTask })
      mockApi({ post: mockPost })
      const result = await apiModule.createTask(newTask)
      expect(result).toEqual(createdTask)
      expect(mockPost).toHaveBeenCalledWith('/tasks', newTask)
    })
  })

  describe('updateTask', () => {
    it('updates an existing task', async () => {
      const updatedTask = {
        title: 'Updated Task',
        description: 'Updated Description',
        status: 'In Progress' as const,
        dueDate: '2024-01-15T10:00:00Z'
      }
      const mockPut = vi.fn().mockResolvedValue({})
      mockApi({ put: mockPut })
      await apiModule.updateTask(1, updatedTask)
      expect(mockPut).toHaveBeenCalledWith('/tasks/1', updatedTask)
    })
  })

  describe('deleteTask', () => {
    it('deletes a task', async () => {
      const mockDelete = vi.fn().mockResolvedValue({})
      mockApi({ delete: mockDelete })
      await apiModule.deleteTask(1)
      expect(mockDelete).toHaveBeenCalledWith('/tasks/1')
    })
  })
}) 