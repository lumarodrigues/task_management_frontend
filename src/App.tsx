import { useState, useEffect } from 'react';
import { Tags } from 'lucide-react';
import TagManager from './components/TagManager';
import { Task, Tag } from './types/task';
import * as taskApi from './api/taskApi';

function App() {
  const [_tasks, setTasks] = useState<Task[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isTagManagerOpen, setIsTagManagerOpen] = useState(false);
  const [_error, setError] = useState<string>('');

  useEffect(() => {
    fetchTasks();
    fetchTags();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskApi.getTasks();
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
      setTasks([]);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await taskApi.getTags();
      setTags(response.data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tags');
      setTags([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white">Task Manager</h1>

        <button
          onClick={() => setIsTagManagerOpen(true)}
          className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors flex items-center gap-2"
        >
          <Tags size={20} />
          Manage Tags
        </button>

        {isTagManagerOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Manage Tags</h2>
                <button
                  onClick={() => setIsTagManagerOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <TagManager tags={tags ?? []} onTagsChange={fetchTags} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
