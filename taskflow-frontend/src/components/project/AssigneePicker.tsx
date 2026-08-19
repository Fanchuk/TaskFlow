import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { tasksService } from '../../services/tasks.service';

export default function AssigneePicker({ taskId, projectId, current }: { taskId: string; projectId: string; current?: { fullName: string } | null }) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const { data: users = [] } = useQuery({ queryKey: ['users'], queryFn: tasksService.members });

  const assign = useMutation({
    mutationFn: (assigneeId: string | null) => tasksService.assign(taskId, assigneeId),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['tasks', projectId] }); setOpen(false); },
  });

  return (
    <div className="relative">
      <button onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }} className="flex items-center">
        {current ? <Avatar seed={current.fullName} size={24} /> : <span className="flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-white/30"><UserPlus className="h-3 w-3 text-white/40" /></span>}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-8 z-30 w-48 rounded-lg border border-[#374151] bg-[#1f2937] p-1 shadow-xl">
            <button onClick={() => assign.mutate(null)} className="block w-full rounded px-3 py-2 text-left text-sm text-white/60 hover:bg-white/5">Unassigned</button>
            {users.map((u: any) => (
              <button key={u.id} onClick={() => assign.mutate(u.id)} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-white/5">
                <Avatar seed={u.fullName} size={22} /> {u.fullName}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}