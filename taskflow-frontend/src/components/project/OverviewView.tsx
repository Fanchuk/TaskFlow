import { useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'motion/react';
import Avatar from '../ui/Avatar';
import { projectsService } from '../../services/projects.service';
import Spinner from '../ui/Spinner';

export default function OverviewView() {
  const { projectId } = useOutletContext<{ projectId: string }>();
  const { data, isLoading } = useQuery({ queryKey: ['overview', projectId], queryFn: () => projectsService.overview(projectId) });

  if (isLoading || !data) return <div className="flex justify-center py-20"><Spinner /></div>;

  const cols = [
    { label: 'To Do', value: data.byStatus.todo, color: 'text-amber-400' },
    { label: 'In Progress', value: data.byStatus.in_progress, color: 'text-blue-400' },
    { label: 'Done', value: data.byStatus.done, color: 'text-green-400' },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-[#1f2937] p-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">{data.progress}% complete</span>
          <span className="text-sm text-white/50">{data.byStatus.done} of {data.total} tasks done</span>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#374151]">
          <motion.div initial={{ width: 0 }} animate={{ width: `${data.progress}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-[#4f46e5]" />
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        {cols.map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="rounded-2xl bg-[#1f2937] p-5 text-center">
            <p className={`text-3xl font-bold ${c.color}`}>{c.value}</p>
            <p className="mt-1 text-sm text-white/60">{c.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl bg-[#1f2937] p-6">
          <h3 className="mb-4 font-bold">Members</h3>
          <div className="space-y-3">
            {data.members.map((m: any) => (
              <div key={m.id} className="flex items-center gap-3">
                <Avatar seed={m.fullName} size={36} />
                <span className="text-sm">{m.fullName}</span>
              </div>
            ))}
            {data.members.length === 0 && <p className="text-sm text-white/40">No members yet</p>}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl bg-[#1f2937] p-6">
          <h3 className="mb-4 font-bold">Recent completed</h3>
          <div className="space-y-2">
            {data.recent.map((t: any) => (
              <div key={t.id} className="flex items-center justify-between text-sm">
                <span className="text-blue-400">{t.title}</span>
                <span className="text-white/40">{t.assignee?.fullName ?? '—'}</span>
              </div>
            ))}
            {data.recent.length === 0 && <p className="text-sm text-white/40">Nothing yet</p>}
          </div>
        </motion.div>
      </div>
    </div>
  );
}