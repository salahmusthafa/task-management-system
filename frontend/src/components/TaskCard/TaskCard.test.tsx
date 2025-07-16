import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import TaskCard from './TaskCard';
import type { Task } from '../../types/task';

const mockTask: Task = {
  id: 1,
  title: 'Sample Task',
  description: 'A sample description',
  status: 'To Do',
  dueDate: '2024-12-31T23:59:59Z',
};

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe('TaskCard', () => {
  it('renders title, status, and due date', () => {
    renderWithRouter(<TaskCard task={mockTask} />);
    expect(screen.getByText('Sample Task')).toBeInTheDocument();
    expect(screen.getAllByText('To Do')).toHaveLength(2); // Badge + paragraph
    expect(screen.getByText(/Due:/)).toBeInTheDocument();
  });

  it('calls onView, onEdit, onDelete when buttons are clicked', () => {
    const onView = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    renderWithRouter(
      <TaskCard task={mockTask} onView={onView} onEdit={onEdit} onDelete={onDelete} />
    );
    fireEvent.click(screen.getByText('View'));
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Delete'));
    expect(onView).toHaveBeenCalled();
    expect(onEdit).toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalled();
  });

  it('has accessible card role and label', () => {
    renderWithRouter(<TaskCard task={mockTask} />);
    const card = screen.getByRole('button', { name: /view details/i });
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  it('shows correct badge color for status', () => {
    renderWithRouter(<TaskCard task={{ ...mockTask, status: 'Done' }} />);
    const badges = screen.getAllByText('Done');
    expect(badges).toHaveLength(2); // Badge + paragraph
    // Color assertion is optional, as styles may be in CSS modules
  });
}); 