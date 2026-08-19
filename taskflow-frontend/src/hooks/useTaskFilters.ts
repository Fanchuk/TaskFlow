import { useState } from 'react';
import type { Task } from '../types';

export function useTaskFilters(tasks: Task[]) {
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const filtered = tasks
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => priority === 'all' || t.priority === priority);

  return { search, setSearch, priority, setPriority, filtered };
}