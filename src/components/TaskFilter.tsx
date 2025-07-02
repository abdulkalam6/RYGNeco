import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  TaskFilter as FilterType,
  TASK_CATEGORIES,
} from '@/types/task';
import { Search, Filter, SortAsc } from 'lucide-react';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    completed: number;
    pending: number;
    overdue: number;
  };
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const TaskFilter = ({
  currentFilter,
  onFilterChange,
  taskCounts,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: TaskFilterProps) => {
  const filters: {
    key: FilterType;
    label: string;
    count: number;
    emoji: string;
  }[] = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all, emoji: '📋' },
    { key: 'pending', label: 'Pending', count: taskCounts.pending, emoji: '⏳' },
    { key: 'completed', label: 'Completed', count: taskCounts.completed, emoji: '✅' },
    { key: 'overdue', label: 'Overdue', count: taskCounts.overdue, emoji: '🚨' },
  ];

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search tasks by title or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 pr-4 py-4 text-base rounded-xl bg-black/30 border border-purple-700 text-white placeholder-purple-400 focus:border-pink-500 transition-colors"
        />
      </div>

      {/* Filter Buttons + Category/Sort */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 flex-1">
          {filters.map(({ key, label, count, emoji }) => (
            <Button
              key={key}
              onClick={() => onFilterChange(key)}
              variant={currentFilter === key ? 'default' : 'outline'}
              className={`rounded-full text-white px-4 py-2 text-sm transition-all duration-200 ${
                currentFilter === key
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:brightness-110'
                  : 'bg-black/30 border border-purple-700 hover:bg-purple-800'
              } ${key === 'overdue' && count > 0 ? 'ring-2 ring-red-400' : ''}`}
            >
              <span className="mr-2">{emoji}</span>
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{label.split(' ')[0]}</span>
              <Badge
                variant="secondary"
                className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  key === 'overdue' && count > 0
                    ? 'bg-red-600 text-white'
                    : 'bg-purple-500 text-white'
                }`}
              >
                {count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Category + Sort Dropdowns */}
        <div className="flex flex-col sm:flex-row gap-2 lg:w-auto">
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full sm:w-48 bg-black/30 text-white border border-purple-700 focus:border-pink-500 rounded-xl">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-purple-300" />
                <SelectValue placeholder="All Categories" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-black text-white border-purple-700">
              <SelectItem value="all">All Categories</SelectItem>
              {TASK_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-full sm:w-48 bg-black/30 text-white border border-purple-700 focus:border-pink-500 rounded-xl">
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-purple-300" />
                <SelectValue placeholder="Sort By" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-black text-white border-purple-700">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="alphabetical">A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
