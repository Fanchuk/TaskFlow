import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { statsService } from '../../services/stats.service';

export default function DeadlinesCard() {
  const navigate = useNavigate();
  const { data: tasks = [] } = useQuery({ queryKey: ['dashboard', 'deadlines'], queryFn: statsService.deadlines });

  const label = (date: string) => {
    const days = Math.ceil((new Date(date).getTime() - Date.now()) / 86400000);
    if (days < 0) return { text: 'Overdue', color: 'text-red-400' };
    if (days === 0) return { text: 'Today', color: 'text-amber-400' };
    if (days === 1) return { text: 'Tomorrow', color: 'text-amber-400' };
    return { text: `In ${days} days`, color: 'text-white/50' };
  };

  return (
    <div className="rounded-xl border border-[#374151] bg-[#1f2937] p-6">
      <h3 className="mb-4 text-xl font-bold">Upcoming Deadlines</h3>
      <div className="space-y-1">
        {tasks.map((t: any, i: number) => {
          const l = label(t.dueDate);
          return (
            <motion.div key={t.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/projects/${t.projectId}/kanban`)}
              className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 hover:bg-white/5">
              <span className="truncate text-sm">{t.title}</span>
              <span className={`shrink-0 text-xs ${l.color}`}>{l.text}</span>
            </motion.div>
          );
        })}
        {tasks.length === 0 && <p className="py-4 text-center text-sm text-white/40">No deadlines</p>}
      </div>
    </div>
  );
}