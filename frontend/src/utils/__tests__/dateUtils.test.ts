import { describe, it, expect } from 'vitest';
import { formatDate, getStatusColor, validateTask } from '../dateUtils';

describe('formatDate', () => {
  it('formats ISO date string', () => {
    const result = formatDate('2024-01-15T10:00:00Z');
    expect(["1/15/2024", "15/01/2024"]).toContain(result);
  });
  it('returns Invalid Date for bad input', () => {
    expect(formatDate('bad')).toBe('Invalid Date');
  });
});

describe('getStatusColor', () => {
  it('returns correct color for To Do', () => {
    expect(getStatusColor('To Do')).toEqual({ bg: '#e0e0e0', text: '#222' });
  });
  it('returns correct color for Done', () => {
    expect(getStatusColor('Done')).toEqual({ bg: '#b9f6ca', text: '#00695c' });
  });
});

describe('validateTask', () => {
  it('returns no errors for valid task', () => {
    const task = { title: 'T', description: 'D', dueDate: '2024-01-01' };
    expect(validateTask(task)).toHaveLength(0);
  });
  it('returns errors for missing fields', () => {
    const task = { title: '', description: '', dueDate: '' };
    const errors = validateTask(task);
    expect(errors).toContain('Title is required');
    expect(errors).toContain('Description is required');
    expect(errors).toContain('Due date is required');
  });
  it('returns error for invalid date', () => {
    const task = { title: 'T', description: 'D', dueDate: 'bad' };
    expect(validateTask(task)).toContain('Invalid due date format');
  });
}); 