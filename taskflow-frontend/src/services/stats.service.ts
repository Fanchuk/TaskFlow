import { api } from '../lib/axios';
import type { StatusOverview, TaskDonePoint } from '../types';

export const statsService = {
  status: () => api.get<StatusOverview>('/stats/status').then((r) => r.data),
  taskDone: (period: string) => api.get<TaskDonePoint[]>('/stats/task-done', { params: { period } }).then((r) => r.data),
  overview: () => api.get('/stats/overview').then((r) => r.data),
  productivity: () => api.get('/stats/productivity').then((r) => r.data),
  deadlines: () => api.get('/stats/deadlines').then((r) => r.data),
  priorities: () => api.get('/stats/priorities').then((r) => r.data),
  activity: () => api.get('/stats/activity').then((r) => r.data),
  myTasks: () => api.get('/stats/my-tasks').then((r) => r.data),
};