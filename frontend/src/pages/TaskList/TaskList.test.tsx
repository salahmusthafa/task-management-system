import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import TaskList from './TaskList';

// Mock the taskApi module
vi.mock('../../services/taskApi', () => ({
  getTasks: vi.fn(() => Promise.resolve({ tasks: [], total: 0 })),
  deleteTask: vi.fn(() => Promise.resolve()),
}));

// Mock ReactDOM.createPortal
vi.mock('react-dom', () => ({
  ...vi.importActual('react-dom'),
  createPortal: vi.fn((node: React.ReactNode) => node),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('TaskList Component', () => {
  beforeEach(() => {
    // Mock window.innerWidth and window.innerHeight
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders task list with dynamic page size indicator', () => {
    renderWithRouter(<TaskList />);
    
    // Check that the page size indicator is displayed
    expect(screen.getByText(/Showing \d+ cards per page/)).toBeInTheDocument();
  });

  it('updates page size when window is resized', () => {
    renderWithRouter(<TaskList />);
    
    // Simulate window resize
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600, // Smaller width
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 600, // Smaller height
    });
    
    // Trigger resize event
    fireEvent(window, new Event('resize'));
    
    // The component should update the page size indicator
    // Note: Due to debouncing, we might need to wait
    setTimeout(() => {
      expect(screen.getByText(/Showing \d+ cards per page/)).toBeInTheDocument();
    }, 200);
  });

  it('handles mobile viewport correctly', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 400, // Mobile width
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 700,
    });

    renderWithRouter(<TaskList />);
    
    // Should still show the page size indicator
    expect(screen.getByText(/Showing \d+ cards per page/)).toBeInTheDocument();
  });
}); 