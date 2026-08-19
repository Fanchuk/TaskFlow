import { api } from '../lib/axios';

export type Message = {
  id: string;
  text: string | null;
  fileUrl: string | null;
  fileType: string | null;
  fileName: string | null;
  senderId: string;
  receiverId: string | null;
  createdAt: string;
  sender: {
    id: string;
    fullName: string;
    role?: string;
  };
};

export interface SendMessageDto {
  text?: string;
  receiverId?: string;
  fileUrl?: string;
  fileType?: 'image' | 'video' | 'audio' | 'file' | string;
  fileName?: string;
}

export const chatService = {
  messages: (receiverId?: string) =>
    api.get<Message[]>('/chat', { params: receiverId ? { receiverId } : {} }).then((r) => r.data),

  send: (data: SendMessageDto) =>
    api.post<Message>('/chat', data).then((r) => r.data),

  clear: (receiverId?: string) =>
    api.delete('/chat', { params: receiverId ? { receiverId } : {} }).then((r) => r.data),

  deleteMessage: (messageId: string) =>
    api.delete(`/chat/${messageId}`).then((r) => r.data),

  upload: (file: File | Blob) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return api.post<{ url: string }>('/chat/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((r) => r.data.url);
  },
};