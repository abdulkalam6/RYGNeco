import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Task, TaskPriority, TASK_CATEGORIES } from '@/types/task';
import { Calendar, Flag, FolderOpen } from 'lucide-react';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (taskData: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
  onCancel: () => void;
}

const TaskForm = ({ task, onSubmit, onCancel }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : '');
      setPriority(task.priority);
      setCategory(task.category || '');
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        priority,
        category: category || undefined,
      });
      if (!task) {
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('medium');
        setCategory('');
      }
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-black/30 backdrop-blur-md border border-purple-700 rounded-xl shadow-lg mb-8 text-white">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2 text-white">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold shadow-inner">
            {task ? '✎' : '+'}
          </div>
          {task ? 'Edit Task' : 'Create New Task'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-black/20 border border-purple-600 text-white focus:border-pink-500"
              placeholder="e.g. Watch One Piece 🏴‍☠️"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your task..."
              className="bg-black/20 border border-purple-600 text-white min-h-[100px]"
            />
          </div>

          {/* Due Date & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                Due Date
              </Label>
              <Input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-black/20 border border-purple-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Flag className={`w-4 h-4 ${getPriorityColor(priority)}`} />
                Priority
              </Label>
              <Select value={priority} onValueChange={(val: TaskPriority) => setPriority(val)}>
                <SelectTrigger className="bg-black/20 border border-purple-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black text-white border-purple-700">
                  <SelectItem value="low">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full" />
                      Low
                    </span>
                  </SelectItem>
                  <SelectItem value="medium">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                      Medium
                    </span>
                  </SelectItem>
                  <SelectItem value="high">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full" />
                      High
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4 text-purple-400" />
              Category
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-black/20 border border-purple-600 text-white">
                <SelectValue placeholder="Select a category (optional)" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white border-purple-700">
                {TASK_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white py-6 text-lg rounded-xl shadow-md transition-all"
            >
              {task ? 'Update Task' : 'Create Task'}
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="flex-1 border border-purple-600 text-white hover:bg-purple-800/20 py-6 text-lg rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
