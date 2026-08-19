import { api } from '../lib/axios';

export interface UserSettings {
  theme?: 'light' | 'dark';
  language?: string;
  notifications?: boolean;
  defaultView?: string;
}

export const settingsService = {
  updateProfile: (data: { fullName?: string; email?: string; currentPassword?: string; newPassword?: string }) =>
    api.patch('/users/me', data).then((r) => r.data),
  updateRole: (id: string, role: string) =>
    api.patch(`/users/${id}/role`, { role }).then((r) => r.data),
  deleteAccount: () =>
    api.delete('/users/me').then((r) => r.data),
  updateSettings: (settings: UserSettings) =>
    api.patch('/users/me/settings', settings).then((r) => r.data),
};