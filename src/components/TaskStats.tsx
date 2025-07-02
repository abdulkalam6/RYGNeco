import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types/task';
import { CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats = ({ tasks }: TaskStatsProps) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const overdueTasks = tasks.filter(task => {
    if (task.completed || !task.dueDate) return false;
    return new Date(task.dueDate) < new Date();
  }).length;
  
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const highPriorityPending = tasks.filter(task => !task.completed && task.priority === 'high').length;

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: TrendingUp,
      color: 'from-blue-300 to-indigo-400',
      text: 'text-indigo-600',
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle,
      color: 'from-green-300 to-emerald-400',
      text: 'text-green-600',
    },
    {
      label: 'Pending',
      value: pendingTasks,
      icon: Clock,
      color: 'from-yellow-300 to-amber-400',
      text: 'text-yellow-600',
    },
    {
      label: 'Overdue',
      value: overdueTasks,
      icon: AlertTriangle,
      color: 'from-red-300 to-rose-400',
      text: 'text-red-600',
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <Card key={idx} className="bg-white shadow-md hover:shadow-lg border border-gray-200 transition-all duration-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-gradient-to-br ${stat.color}`}>
                <stat.icon className={`w-5 h-5 text-white`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {totalTasks > 0 && (
        <Card className="col-span-2 lg:col-span-4 bg-white shadow-md border border-gray-200 transition-all">
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="w-full sm:w-auto">
                <p className="text-sm text-gray-500 mb-1">Progress Overview</p>
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-green-600">{completionRate}%</div>
                  <div className="flex-1 min-w-[200px] bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>
              </div>
              {highPriorityPending > 0 && (
                <Badge variant="destructive" className="whitespace-nowrap mt-2 sm:mt-0">
                  {highPriorityPending} High Priority Pending
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaskStats;
