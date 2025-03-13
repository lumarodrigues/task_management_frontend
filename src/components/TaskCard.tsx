import { format } from 'date-fns';
import { Task, PRIORITY_OPTIONS } from '../types/task';
import { CheckCircle, Circle, Clock, Pencil, Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  const priorityColor = PRIORITY_OPTIONS.find(opt => opt.value === task.priority)?.color || '';
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => onToggleComplete(task.id)}
            className="mt-1 text-purple-600 hover:text-purple-700"
          >
            {task.completed ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
          </button>
          
          <div className="flex-1">
            <h3 className={`text-lg font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            
            <p className="text-gray-600 mt-1">{task.description}</p>
            
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColor}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
              
              <span className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                {format(new Date(task.deadline), 'MMM d, yyyy h:mm a')}
              </span>
              
              {task.tags.map(tag => (
                <span
                  key={tag.id}
                  className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-400 hover:text-gray-600"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-400 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}