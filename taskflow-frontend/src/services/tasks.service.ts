import { api } from '../lib/axios';
import type { Task, TaskDetail } from '../types';

export const tasksService = {
  byProject: (projectId: string) =>
    api.get<Task[]>('/tasks', { params: { projectId } }).then((r) => r.data),

  detail: (id: string) => api.get<TaskDetail>(`/tasks/${id}`).then((r) => r.data),

  create: (data: { title: string; projectId: string; status?: string; priority?: string; dueDate?: string }) =>
    api.post<Task>('/tasks', data).then((r) => r.data),

  update: (id: string, data: Partial<Pick<Task, 'title' | 'priority' | 'dueDate'>>) =>
    api.patch(`/tasks/${id}`, data).then((r) => r.data),

  reorder: (items: { id: string; status: string; order: number }[]) =>
    api.patch('/tasks/reorder', items).then((r) => r.data),

  remove: (id: string) => api.delete(`/tasks/${id}`).then((r) => r.data),

  assign: (id: string, assigneeId: string | null) =>
    api.patch(`/tasks/${id}/assign`, { assigneeId }).then((r) => r.data),

  members: (projectId: string) => 
    api.get(`/tasks/project/${projectId}/members`).then((r) => r.data),
};

export const commentsService = {
  create: (taskId: string, body: string) =>
    api.post(`/tasks/${taskId}/comments`, { body }).then((r) => r.data),
  remove: (taskId: string, id: string) =>
    api.delete(`/tasks/${taskId}/comments/${id}`).then((r) => r.data),
};

export const attachmentsService = {
  create: (taskId: string, data: { name: string; size: number; mime: string }) =>
    api.post(`/tasks/${taskId}/attachments`, data).then((r) => r.data),
  remove: (taskId: string, id: string) =>
    api.delete(`/tasks/${taskId}/attachments/${id}`).then((r) => r.data),
};