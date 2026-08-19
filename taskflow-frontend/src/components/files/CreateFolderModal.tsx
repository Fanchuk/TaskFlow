import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Check } from 'lucide-react';
import Modal from '../ui/Modal';
import { filesService } from '../../services/files.service';
import Spinner from '../ui/Spinner';

const COLORS = [
  { key: 'blue', cls: 'bg-blue-500' },
  { key: 'amber', cls: 'bg-amber-500' },
  { key: 'green', cls: 'bg-green-500' },
  { key: 'orange', cls: 'bg-orange-500' },
];

export default function CreateFolderModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const qc = useQueryClient();
  const [name, setName] = useState('');
  const [color, setColor] = useState('blue');

  const create = useMutation({
    mutationFn: () => filesService.createFolder({ name, color }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['folders'] });
      toast.success('Folder created');
      setName('');
      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Could not create folder');
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-white">
        <h3 className="text-xl font-bold">New folder</h3>
        <input
          value={name} onChange={(e) => setName(e.target.value)} autoFocus
          placeholder="Folder name"
          className="mt-6 w-full rounded-lg border border-[#374151] bg-[#111827] px-4 py-3 outline-none focus:border-[#4f46e5]"
        />
        <div className="mt-4 flex gap-3">
          {COLORS.map((c) => (
            <button
              key={c.key}
              onClick={() => setColor(c.key)}
              className={`relative h-9 w-9 rounded-lg ${c.cls} transition ${
                color === c.key ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1f2937]' : ''
              }`}
            >
              {color === c.key && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </span>
              )}
            </button>
          ))}
        </div>
        <button
          onClick={() => name.trim() && create.mutate()} disabled={create.isPending}
          className="mt-6 w-full rounded-lg bg-[#4f46e5] py-3 font-semibold hover:bg-[#4338ca] disabled:opacity-60"
        >
          {create.isPending ? <span className="flex justify-center"><Spinner /></span> : 'Create folder'}
        </button>
      </div>
    </Modal>
  );
}