import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import { tasksService } from '../../services/tasks.service';
import { COLUMNS } from '../../types';
import Spinner from '../ui/Spinner';

export default function AddTaskModal({ open, onClose, projectId }: { open: boolean; onClose: () => void; projectId: string }) {
  const qc = useQueryClient();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: () => tasksService.create({ 
      title, 
      projectId, 
      status, 
      priority, 
      dueDate: dueDate || undefined 
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks', projectId] });
      toast.success('Task added');
      setTitle('');
      setDueDate('');
      onClose();
    },
  });

  const field = 'w-full rounded-lg border border-[#4b5563] bg-[#374151] px-4 py-3 text-white outline-none focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/20';

  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-white">
        <h3 className="text-xl font-bold">Add task</h3>
        <div className="mt-6 space-y-4">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" className={field} autoFocus />
          <div className="grid grid-cols-2 gap-3">
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={field}>
              {COLUMNS.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
            </select>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className={field}>
              <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-white/50">Due date (optional)</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={field}
              style={{ colorScheme: 'dark' }}
            />
          </div>
          <button
            onClick={() => title.trim() && mutate()}
            disabled={isPending}
            className="w-full rounded-lg bg-[#4f46e5] py-3 font-semibold hover:bg-[#4338ca] disabled:opacity-60"
          >
            {isPending ? <span className="flex justify-center"><Spinner /></span> : 'Create task'}
          </button>
        </div>
      </div>
    </Modal>
  );
}