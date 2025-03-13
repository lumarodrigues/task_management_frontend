import React, { useState } from 'react';
import Select from 'react-select';
import { format } from 'date-fns';
import { Task, Tag, PRIORITY_OPTIONS } from '../types/task';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id'>) => void;
  onCancel: () => void;
  tags: Tag[];
  initialTask?: Task;
}

export default function TaskForm({ onSubmit, onCancel, tags, initialTask }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [priority, setPriority] = useState(initialTask?.priority || 'medium');
  const [deadline, setDeadline] = useState<Date>(
    initialTask?.deadline ? new Date(initialTask.deadline) : new Date()
  );
  const [selectedTags, setSelectedTags] = useState<Tag[]>(initialTask?.tags || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      priority,
      deadline: format(deadline, "yyyy-MM-dd'T'HH:mm:ss"),
      tags: selectedTags,
      completed: initialTask?.completed || false,
    });
  };

  const tagOptions = tags.map(tag => ({
    value: tag.id,
    label: tag.name,
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Priority</label>
        <Select
          options={PRIORITY_OPTIONS}
          value={PRIORITY_OPTIONS.find(opt => opt.value === priority)}
          onChange={(option) => setPriority(option?.value as 'low' | 'medium' | 'high' || 'medium')}
          className="mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Deadline</label>
        <DatePicker
          selected={deadline}
          onChange={(date) => setDeadline(date || new Date())}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <Select
          isMulti
          options={tagOptions}
          value={selectedTags.map(tag => ({ value: tag.id, label: tag.name }))}
          onChange={(options) => {
            setSelectedTags(
              options.map(opt => ({ id: opt.value, name: opt.label }))
            );
          }}
          className="mt-1"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
        >
          {initialTask ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}