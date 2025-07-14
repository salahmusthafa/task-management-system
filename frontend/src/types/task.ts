export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string; // ISO date string
} 