import { api } from '../lib/axios';

export type Session = {
  id: string;
  device: string | null;
  browser: string | null;
  os: string | null;
  ip: string | null;
  lastActive: string;
  current: boolean;
};

export const sessionsService = {
  list: () => api.get<Session[]>('/sessions').then((r) => r.data),
  remove: (id: string) => api.delete(`/sessions/${id}`).then((r) => r.data),
};