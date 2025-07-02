
import { Task } from '@/types/task';

const TASKS_KEY = 'taskTrackerTasks';

// Enhanced sample tasks for development
const sampleTasks: Task[] = [
 
];

export const loadTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(TASKS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Return sample tasks for first-time users
    saveTasks(sampleTasks);
    return sampleTasks;
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return sampleTasks;
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

export const clearTasks = (): void => {
  try {
    localStorage.removeItem(TASKS_KEY);
  } catch (error) {
    console.error('Error clearing tasks from localStorage:', error);
  }
};
