import { describe, it, expect } from 'vitest'

// Example utility functions to test
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

export const getStatusColor = (status: 'To Do' | 'In Progress' | 'Done') => {
  const colors = {
    'To Do': { bg: '#e0e0e0', text: '#222' },
    'In Progress': { bg: '#ffe082', text: '#b26a00' },
    'Done': { bg: '#b9f6ca', text: '#00695c' }
  }
  return colors[status]
}

export const validateTask = (task: { title: string; description: string; dueDate: string }) => {
  const errors: string[] = []
  
  if (!task.title.trim()) {
    errors.push('Title is required')
  }
  
  if (!task.description.trim()) {
    errors.push('Description is required')
  }
  
  if (!task.dueDate) {
    errors.push('Due date is required')
  } else {
    const dueDate = new Date(task.dueDate)
    if (isNaN(dueDate.getTime())) {
      errors.push('Invalid due date format')
    }
  }
  
  return errors
}

describe('Date Utils', () => {
  describe('formatDate', () => {
    it('formats ISO date string correctly', () => {
      const result = formatDate('2024-01-15T10:00:00Z')
      expect(['1/15/2024', '15/01/2024']).toContain(result)
    })

    it('handles different date formats', () => {
      const result = formatDate('2024-12-25')
      expect(['12/25/2024', '25/12/2024']).toContain(result)
    })

    it('handles invalid date gracefully', () => {
      const result = formatDate('invalid-date')
      expect(result).toBe('Invalid Date')
    })
  })

  describe('getStatusColor', () => {
    it('returns correct colors for To Do status', () => {
      const result = getStatusColor('To Do')
      expect(result).toEqual({ bg: '#e0e0e0', text: '#222' })
    })

    it('returns correct colors for In Progress status', () => {
      const result = getStatusColor('In Progress')
      expect(result).toEqual({ bg: '#ffe082', text: '#b26a00' })
    })

    it('returns correct colors for Done status', () => {
      const result = getStatusColor('Done')
      expect(result).toEqual({ bg: '#b9f6ca', text: '#00695c' })
    })
  })

  describe('validateTask', () => {
    it('returns no errors for valid task', () => {
      const task = {
        title: 'Valid Task',
        description: 'Valid Description',
        dueDate: '2024-01-15T10:00:00Z'
      }
      
      const errors = validateTask(task)
      expect(errors).toHaveLength(0)
    })

    it('returns error for empty title', () => {
      const task = {
        title: '',
        description: 'Valid Description',
        dueDate: '2024-01-15T10:00:00Z'
      }
      
      const errors = validateTask(task)
      expect(errors).toContain('Title is required')
    })

    it('returns error for empty description', () => {
      const task = {
        title: 'Valid Task',
        description: '',
        dueDate: '2024-01-15T10:00:00Z'
      }
      
      const errors = validateTask(task)
      expect(errors).toContain('Description is required')
    })

    it('returns error for missing due date', () => {
      const task = {
        title: 'Valid Task',
        description: 'Valid Description',
        dueDate: ''
      }
      
      const errors = validateTask(task)
      expect(errors).toContain('Due date is required')
    })

    it('returns error for invalid due date format', () => {
      const task = {
        title: 'Valid Task',
        description: 'Valid Description',
        dueDate: 'invalid-date'
      }
      
      const errors = validateTask(task)
      expect(errors).toContain('Invalid due date format')
    })

    it('returns multiple errors for multiple issues', () => {
      const task = {
        title: '',
        description: '',
        dueDate: ''
      }
      
      const errors = validateTask(task)
      expect(errors).toHaveLength(3)
      expect(errors).toContain('Title is required')
      expect(errors).toContain('Description is required')
      expect(errors).toContain('Due date is required')
    })

    it('handles whitespace-only strings', () => {
      const task = {
        title: '   ',
        description: '   ',
        dueDate: '2024-01-15T10:00:00Z'
      }
      
      const errors = validateTask(task)
      expect(errors).toContain('Title is required')
      expect(errors).toContain('Description is required')
    })
  })
}) 