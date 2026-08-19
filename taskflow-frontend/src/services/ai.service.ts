import { api } from '../lib/axios';

export const aiService = {
  generateTasks: (title: string, desc: string) =>
    api.post<string[]>('/ai/generate-tasks', { title, desc }).then((r) => r.data),
  summarize: (projectId: string) =>
    api.post<string>(`/ai/summarize/${projectId}`).then((r) => r.data),
};