import * as React from 'react';
import { useState } from 'react';

import { Tag } from '../types/task';
import { X, Plus } from 'lucide-react';
import * as taskApi from '../api/taskApi';

interface TagManagerProps {
  tags: Tag[];
  onTagsChange: () => void;
}

export default function TagManager({ tags, onTagsChange }: TagManagerProps) {
  const [newTagName, setNewTagName] = useState('');
  const [error, setError] = useState('');

  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName.trim()) return;

    try {
      await taskApi.createTag(newTagName.trim());
      setNewTagName('');
      setError('');
      await onTagsChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create tag');
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    if (!window.confirm('Are you sure you want to delete this tag?')) return;

    try {
      await taskApi.deleteTag(tagId);
      setError('');
      await onTagsChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete tag');
    }
  };

  return (
    <div>
      {error && <div className="bg-red-100 text-red-700 p-2">{error}</div>}

      <form onSubmit={handleCreateTag} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="New tag name"
            className="border p-2 rounded-lg"
          />
          <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded-lg">
            <Plus size={20} />
            Add Tag
          </button>
        </div>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {tags.map((tag) => (
          <div key={tag.id} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg">
            <span>{tag.name}</span>
            <button onClick={() => handleDeleteTag(tag.id)} className="text-red-600">
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
