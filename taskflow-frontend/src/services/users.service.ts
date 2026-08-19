import { api } from '../lib/axios';

export type Member = {
  id: string; fullName: string; email: string;
  status: 'online' | 'offline' | 'away'; role: string;
};

export const usersService = {
  getAll: () => api.get<Member[]>('/users').then((r) => r.data),
};