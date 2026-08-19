import { api } from '../lib/axios';

export const invitationsService = {
  create: (data: { email: string; role: string; projects: string[]; message?: string }) =>
    api.post('/invitations', data).then((r) => r.data),
};