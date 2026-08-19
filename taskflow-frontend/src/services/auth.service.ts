import { api } from '../lib/axios';

type AuthResponse = {
    token: string
    user: { id: string; email: string; fullName: string; role: string }
}

export const authService = {
    register: (data: { email: string; fullName: string; password: string }) =>
        api.post<AuthResponse>('/auth/register', data).then((r) => r.data),

    login: (data: { email: string; password: string }) =>
        api.post<AuthResponse>('/auth/login', data).then((r) => r.data),

    getMe: (): Promise<{ id: string; email: string; fullName: string; role: string; settings?: any; status?: string }> => 
        api.get('/auth/me').then((r) => r.data)
}