import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import TaskStats from './TaskStats';
import { Task, TaskFilter as FilterType } from '@/types/task';
import { loadTasks, saveTasks } from '@/utils/localStorage';
import { LogOut, Plus, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TaskDashboardProps {
  user: string;
  onLogout: () => void;
}

const TaskDashboard = ({ user, onLogout }: TaskDashboardProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const { toast } = useToast();

  useEffect(() => {
    const storedTasks = loadTasks();
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [newTask, ...prev]);
    setIsFormOpen(false);
    toast({
      title: "Task Created",
      description: "Your new task has been added successfully!",
    });
  };

  const updateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    if (!editingTask) return;

    setTasks(prev => prev.map(task =>
      task.id === editingTask.id
        ? { ...task, ...taskData }
        : task
    ));
    setEditingTask(null);
    toast({
      title: "Task Updated",
      description: "Your task has been updated successfully!",
    });
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast({
      title: "Task Deleted",
      description: "The task has been removed.",
      variant: "destructive",
    });
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ));

    const task = tasks.find(t => t.id === id);
    if (task) {
      toast({
        title: task.completed ? "Task Reopened" : "Task Completed",
        description: task.completed ? "Task marked as pending" : "Great job! Task completed! 🎉",
      });
    }
  };

  const sortTasks = (tasks: Task[]) => {
    switch (sortBy) {
      case 'oldest':
        return [...tasks].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return [...tasks].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      case 'dueDate':
        return [...tasks].sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
      case 'alphabetical':
        return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
      case 'newest':
      default:
        return [...tasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  };

  const filteredTasks = sortTasks(tasks.filter(task => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed) ||
      (filter === 'overdue' && !task.completed && task.dueDate && new Date(task.dueDate) < new Date());

    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || task.category === selectedCategory;

    return matchesFilter && matchesSearch && matchesCategory;
  }));

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
    overdue: tasks.filter(task => !task.completed && task.dueDate && new Date(task.dueDate) < new Date()).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Logo */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500 shadow-md animate-pulse">
              <img
                src="/logo.jpeg"
                alt="TaskFlow Logo"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-md">
                Welcome, {user}! 👋
              </h1>
              <p className="text-purple-300 mt-1 italic text-sm">
                Your anime productivity universe ⚡️
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:brightness-110 text-white px-6 py-5 text-base rounded-full shadow-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Add New Task</span>
              <span className="sm:hidden">Add Task</span>
            </Button>
            <Button variant="outline" size="icon" className="bg-black/30 border-purple-500 hover:bg-purple-500/20 p-6 rounded-full">
              <Settings className="w-5 h-5 text-purple-300" />
            </Button>
            <Button onClick={onLogout} variant="outline" size="icon" className="bg-black/30 border-purple-500 hover:bg-red-500/20 p-6 rounded-full">
              <LogOut className="w-5 h-5 text-red-400" />
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-md p-6 mb-6 border border-purple-700">
          <TaskStats tasks={tasks} />
        </div>

        {/* Task Form */}
        {(isFormOpen || editingTask) && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-md p-6 mb-6 border border-purple-700">
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? updateTask : addTask}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingTask(null);
              }}
            />
          </div>
        )}

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-md p-4 mb-6 border border-purple-700">
          <TaskFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            taskCounts={taskCounts}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>

        {/* Task List */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl shadow-md p-4 border border-purple-700">
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onEdit={setEditingTask}
            onDelete={deleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
