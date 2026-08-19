// --- Проєкти ---
export type ProjectStatus = 'active' | 'on-hold' | 'completed';

export type Project = {
  id: string;
  title: string;
  desc: string;
  status: ProjectStatus;
  color: string;
  members: number;
  progress: number;
};

export type StatusOverview = {
  todo: number;
  in_progress: number;
  done: number;
};

// --- Задачі ---
export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: Priority;
  order: number;
  dueDate: string | null;
  _count?: { comments: number; attachments: number };
};

export type Comment = {
  id: string;
  body: string;
  createdAt: string;
  author: { id: string; fullName: string };
};

export type Attachment = {
  id: string;
  name: string;
  size: number;
  mime: string;
  createdAt: string;
};

export type TaskDetail = Task & {
  comments: Comment[];
  attachments: Attachment[];
  project: { id: string; title: string };
};

export type TaskDonePoint = { 
  label: string; 
  value: number; 
};

export const COLUMNS: { key: TaskStatus; label: string; dot: string }[] = [
  { key: 'todo', label: 'To Do', dot: 'bg-amber-400' },
  { key: 'in_progress', label: 'In Progress', dot: 'bg-blue-500' },
  { key: 'done', label: 'Done', dot: 'bg-green-500' },
];

export const PRIORITY_STYLE: Record<Priority, string> = {
  low: 'bg-green-900/50 text-green-400',
  medium: 'bg-amber-900/50 text-amber-400',
  high: 'bg-red-900/50 text-red-400',
};