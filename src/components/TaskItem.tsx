import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types/task';
import {
  CheckCircle,
  Circle,
  Edit2,
  Trash2,
  Calendar,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { format, isToday, isTomorrow, isPast } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  index: number;
}

const TaskItem = ({ task, onToggle, onEdit, onDelete, index }: TaskItemProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isOverdue = task.dueDate && !task.completed && isPast(new Date(task.dueDate));
  const isDueToday = task.dueDate && isToday(new Date(task.dueDate));
  const isDueTomorrow = task.dueDate && isTomorrow(new Date(task.dueDate));

  const formatDueDate = (dueDate: string) => {
    const date = new Date(dueDate);
    if (isDueToday) return 'Due Today';
    if (isDueTomorrow) return 'Due Tomorrow';
    return format(date, 'MMM dd, yyyy');
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(task.id);
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-gradient-to-r from-red-500 to-pink-600 text-white';
      case 'medium':
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black';
      case 'low':
        return 'bg-gradient-to-r from-green-400 to-green-600 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <Card
      className={`transition-all duration-300 rounded-xl backdrop-blur-md border border-purple-700 bg-black/40 text-white hover:shadow-lg hover:shadow-purple-500/30 ${
        task.completed ? 'opacity-60 line-through' : ''
      } ${isOverdue ? 'border-l-4 border-red-600' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {/* Toggle Completion */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggle(task.id)}
            className="hover:bg-transparent"
          >
            {task.completed ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 hover:text-green-400" />
            )}
          </Button>

          {/* Task Details */}
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className={`text-lg font-semibold truncate ${task.completed ? 'text-gray-400' : 'text-white'}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-purple-300 line-clamp-3">{task.description}</p>
                )}
              </div>

              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(task)}
                  className="text-purple-300 hover:text-blue-400"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDelete}
                  className={`${
                    showDeleteConfirm ? 'text-red-500 bg-red-900/10' : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-sm mt-1">
              <Badge className={`text-xs px-2 py-1 rounded-full ${getPriorityClass(task.priority)}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </Badge>

              {task.category && (
                <Badge className="bg-purple-700/30 border border-purple-500 text-white text-xs rounded-full px-2 py-1">
                  {task.category}
                </Badge>
              )}

              {task.dueDate && (
                <div
                  className={`flex items-center gap-1 text-xs ${
                    isOverdue ? 'text-red-400' : isDueToday ? 'text-yellow-400' : 'text-purple-300'
                  }`}
                >
                  {isOverdue ? <AlertTriangle className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
                  <span>{formatDueDate(task.dueDate)}</span>
                </div>
              )}

              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                <span>Created {format(new Date(task.createdAt), 'MMM dd')}</span>
              </div>
            </div>

            {showDeleteConfirm && (
              <div className="mt-2 p-2 text-red-400 border border-red-500 rounded-md bg-red-900/20 text-xs">
                Click delete again to confirm
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
