import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { statsService } from '../../services/stats.service';

export default function PrioritiesCard() {
  const { data } = useQuery({ queryKey: ['dashboard', 'priorities'], queryFn: statsService.priorities });

  const chart = [
    { name: 'High', value: data?.high ?? 0, color: '#ef4444' },
    { name: 'Medium', value: data?.medium ?? 0, color: '#f59e0b' },
    { name: 'Low', value: data?.low ?? 0, color: '#22c55e' },
  ];
  const total = chart.reduce((s, d) => s + d.value, 0);

  return (
    <div className="rounded-xl border border-[#374151] bg-[#1f2937] p-6">
      <h3 className="mb-2 text-xl font-bold">Open Tasks by Priority</h3>
      <div className="h-[180px]">
        {total > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chart} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={3}>
                {chart.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : <div className="flex h-full items-center justify-center text-sm text-white/40">No open tasks</div>}
      </div>
      <div className="flex justify-center gap-4 text-sm">
        {chart.map((d) => (
          <span key={d.name} className="flex items-center gap-1.5 text-white/70">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />{d.name} ({d.value})
          </span>
        ))}
      </div>
    </div>
  );
}