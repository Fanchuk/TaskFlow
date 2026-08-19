import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { FolderClosed, CheckSquare, TrendingUp, AlertTriangle } from 'lucide-react';
import { statsService } from '../../services/stats.service';

export default function DashboardMetrics() {
  const { data } = useQuery({ queryKey: ['dashboard', 'overview'], queryFn: statsService.overview });

  const cards = [
    { label: 'Projects', value: data?.projects ?? 0, sub: `${data?.activeProjects ?? 0} active`, icon: FolderClosed, color: 'text-blue-400' },
    { label: 'Tasks', value: data?.tasks ?? 0, sub: `${data?.doneTasks ?? 0} done`, icon: CheckSquare, color: 'text-purple-400' },
    { label: 'Progress', value: `${data?.progress ?? 0}%`, sub: 'completed', icon: TrendingUp, color: 'text-green-400' },
    { label: 'Overdue', value: data?.overdue ?? 0, sub: 'need attention', icon: AlertTriangle, color: (data?.overdue ?? 0) > 0 ? 'text-red-400' : 'text-white/40' },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map((c, i) => (
        <motion.div key={c.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
          whileHover={{ y: -3 }} className="rounded-xl border border-[#374151] bg-[#1f2937] p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">{c.label}</span>
            <c.icon className={`h-4 w-4 ${c.color}`} />
          </div>
          <p className="mt-2 text-2xl font-bold">{c.value}</p>
          <p className="text-xs text-white/40">{c.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}