import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import { statsService } from '../../services/stats.service';

function timeAgo(date: string) {
  const min = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function TeamActivityCard() {
  const { data: tasks = [] } = useQuery({ queryKey: ['dashboard', 'team-activity'], queryFn: statsService.activity });

  return (
    <div className="rounded-xl border border-[#374151] bg-[#1f2937] p-6">
      <h3 className="mb-4 text-xl font-bold">Recent Activity</h3>
      <div className="space-y-1">
        {tasks.map((t: any, i: number) => (
          <motion.div key={t.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
            className="flex items-center gap-3 rounded-lg px-2 py-2">
            <CheckCircle className="h-4 w-4 shrink-0 text-green-400" />
            <div className="flex-1 text-sm">
              <span className="text-white/80">{t.assignee?.fullName ?? 'Someone'}</span>
              <span className="text-white/50"> completed </span>
              <span className="text-blue-400">{t.title}</span>
            </div>
            <span className="text-xs text-white/40">{timeAgo(t.doneAt)}</span>
          </motion.div>
        ))}
        {tasks.length === 0 && <p className="py-4 text-center text-sm text-white/40">No activity yet</p>}
      </div>
    </div>
  );
}