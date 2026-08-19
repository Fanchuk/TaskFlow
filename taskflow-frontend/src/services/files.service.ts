import { api } from '../lib/axios';

export type Folder = { 
  id: string; 
  name: string; 
  color: string; 
  fileCount: number; 
};

export type FileMember = { 
  id: string; 
  fullName: string; 
};

export type FileItem = {
  id: string;
  name: string;
  size: number;
  mime: string;
  folderId: string | null;
  createdAt: string;
  isStarred: boolean;
  deletedAt: string | null;
  owner: FileMember;
  shares: { user: FileMember }[];
};

export type Storage = {
  used: number;
  total: number;
  byType: { image: number; video: number; document: number; other: number };
};

export type Activity = { 
  id: string; 
  action: string; 
  fileName: string; 
  createdAt: string; 
  user: { fullName: string };
};

export type FileStats = {
  totalFiles: number;
  folders: number;
  shared: number;
  used: number;
  byMonth: Record<string, number>;
  byType: { image: number; video: number; document: number; other: number };
  topFiles: { name: string; size: number }[];
};

export const filesService = {
  folders: () => 
    api.get<Folder[]>('/files/folders').then((r) => r.data),

  recent: (folderId?: string) =>
    api.get<FileItem[]>('/files/recent', { params: folderId ? { folderId } : {} }).then((r) => r.data),

  allFiles: (folderId?: string) =>
    api.get<FileItem[]>('/files/all', { params: folderId ? { folderId } : {} }).then((r) => r.data),

  storage: () => 
    api.get<Storage>('/files/storage').then((r) => r.data),

  createFolder: (data: { name: string; color?: string }) =>
    api.post('/files/folders', data).then((r) => r.data),

  createFile: (data: { name: string; size: number; mime: string; folderId?: string }) =>
    api.post('/files', data).then((r) => r.data),

  remove: (id: string) => 
    api.delete(`/files/${id}`).then((r) => r.data),

  share: (fileId: string, userId: string) =>
    api.post(`/files/${fileId}/share`, { userId }).then((r) => r.data),

  unshare: (fileId: string, userId: string) =>
    api.delete(`/files/${fileId}/share/${userId}`).then((r) => r.data),

  folderFiles: (folderId: string) =>
    api.get<FileItem[]>(`/files/folder/${folderId}`).then((r) => r.data),

  folderInfo: (folderId: string) =>
    api.get(`/files/folder/${folderId}/info`).then((r) => r.data),

  starred: () => 
    api.get<FileItem[]>('/files/starred').then((r) => r.data),

  trash: () => 
    api.get<FileItem[]>('/files/trash').then((r) => r.data),

  activity: () => 
    api.get<Activity[]>('/files/activity').then((r) => r.data),

  stats: () => 
    api.get<FileStats>('/files/stats').then((r) => r.data),

  toggleStar: (id: string) => 
    api.patch(`/files/${id}/star`).then((r) => r.data),

  rename: (id: string, name: string) => 
    api.patch(`/files/${id}/rename`, { name }).then((r) => r.data),

  move: (id: string, folderId: string | null) => 
    api.patch(`/files/${id}/move`, { folderId }).then((r) => r.data),

  restore: (id: string) => 
    api.patch(`/files/${id}/restore`).then((r) => r.data),

  emptyTrash: () => 
    api.delete('/files/trash/empty').then((r) => r.data),

  permanentDelete: (id: string) => 
    api.delete(`/files/${id}/permanent`).then((r) => r.data),
};