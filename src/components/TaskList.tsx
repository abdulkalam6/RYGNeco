import { Task } from '@/types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList = ({ tasks, onToggle, onEdit, onDelete }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-black/30 backdrop-blur-md rounded-xl border border-purple-700 shadow-inner animate-fade-in">
        <div className="text-6xl mb-4 animate-bounce">📝</div>
        <h3 className="text-2xl font-bold text-white drop-shadow-md mb-2">
          No tasks yet!
        </h3>
        <p className="text-purple-300 text-sm">
          Add your first task and begin your journey to productivity ✨
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          index={index}
        />
      ))}
    </div>
  );
};

export default TaskList;
