const API_URL = 'http://localhost:8001/api';

import axios from 'axios';
import { Task, Tag } from '../types/task';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  validateStatus: (status) => status >= 200 && status < 300,
});

// Tasks
export const getTasks = () => api.get<Task[]>('/tasks/');
export const createTask = (task: Omit<Task, 'id'>) => api.post<Task>('/tasks/', task);
export const deleteTask = (id: string) => api.delete(`/tasks/${id}/`);

// Tags
export const getTags = () => api.get<Tag[]>('/tags/');
export const createTag = (name: string) => api.post<Tag>('/tags/', { name });
export const deleteTag = (id: string) => api.delete(`/tags/${id}/`);
