import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import { statsService } from '../../services/stats.service';
import Spinner from '../ui/Spinner';

const TABS = [
  { label: 'Daily', period: 'daily' },
  { label: 'Weekly', period: 'weekly' },
  { label: 'Monthly', period: 'monthly' },
];

export default function TaskDoneChart() {
  const [tab, setTab] = useState('monthly');

  const { data = [], isLoading } = useQuery({
    queryKey: ['dashboard', 'task-done', tab],
    queryFn: () => statsService.taskDone(tab),
  });

  return (
    <div className="rounded-2xl border border-[#374151] bg-[#1f2937] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Task Done</h3>
        <div className="flex gap-6 text-sm">
          {TABS.map((t) => (
            <button
              key={t.period}
              onClick={() => setTab(t.period)}
              className={`relative pb-1 transition-colors ${tab === t.period ? 'text-blue-400' : 'text-white/60 hover:text-white/90'}`}
            >
              {t.label}
              {tab === t.period && (
                <motion.span layoutId="chartTab" className="absolute -bottom-px left-0 h-0.5 w-full bg-blue-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[320px] w-full">
        {isLoading ? (
          <div className="flex h-full items-center justify-center"><Spinner /></div>
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-white/50">
            No completed tasks yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#374151" />
              <XAxis dataKey="label" stroke="#9ca3af" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} />
              <Tooltip
                contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}