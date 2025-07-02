
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  category?: string;
}

export type TaskFilter = 'all' | 'completed' | 'pending' | 'overdue';

export type TaskPriority = 'low' | 'medium' | 'high';

export const TASK_CATEGORIES = [
  'Personal',
  'Work',
  'Health',
  'Learning',
  'Shopping',
  'Travel',
  'Finance',
  'Other'
] as const;
