import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'motion/react';
import { statsService } from '../../services/stats.service';
import Spinner from '../ui/Spinner';

export default function TaskStatus() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', 'status-overview'],
    queryFn: statsService.status,
  });

  const chart = [
    { name: 'To Do', value: data?.todo ?? 0, color: '#f59e0b' },
    { name: 'In Progress', value: data?.in_progress ?? 0, color: '#3b82f6' },
    { name: 'Done', value: data?.done ?? 0, color: '#22c55e' },
  ];
  const total = chart.reduce((s, d) => s + d.value, 0);

  return (
    <div className="rounded-lg border border-[#374151] bg-[#1f2937] p-6">
      <h3 className="text-xl font-bold text-white">Task Status Overview</h3>

      <div className="mx-auto h-[220px] w-full max-w-[280px]">
        {isLoading ? (
          <div className="flex h-full items-center justify-center"><Spinner /></div>
        ) : total === 0 ? (
          <div className="flex h-full items-center justify-center text-white/50">No tasks yet</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chart} dataKey="value" innerRadius={60} outerRadius={90}
                paddingAngle={3} startAngle={90} endAngle={-270} animationDuration={600}
              >
                {chart.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="flex justify-center gap-5 text-sm">
        {chart.map((d) => (
          <span key={d.name} className="flex items-center gap-1.5 text-white/80">
            <span className="h-3 w-3 rounded-sm" style={{ background: d.color }} />{d.name}
          </span>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        {chart.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
          >
            <p className="text-2xl font-bold text-white">{d.value}</p>
            <p className="text-sm text-white/60">{d.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}