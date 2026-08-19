import { useQuery } from '@tanstack/react-query';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import Avatar from '../ui/Avatar';
import { tasksService } from '../../services/tasks.service';
import { PRIORITY_STYLE, type Priority } from '../../types';
import Spinner from '../ui/Spinner';

const PRIORITY_BAR: Record<string, string> = { high: 'bg-red-500', medium: 'bg-amber-500', low: 'bg-green-500' };

function daysBetween(a: Date, b: Date) {
  return Math.ceil((b.getTime() - a.getTime()) / 86400000);
}

export default function TimelineView() {
  const { projectId } = useOutletContext<{ projectId: string }>();
  const navigate = useNavigate();
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => tasksService.byProject(projectId),
  });

  if (isLoading) return <div className="flex justify-center py-20"><Spinner /></div>;

  const withDates = tasks.filter((t: any) => t.startDate && t.dueDate);

  const rangeStart = new Date(Math.min(...withDates.map((t: any) => new Date(t.startDate).getTime())));
  const rangeEnd   = new Date(Math.max(...withDates.map((t: any) => new Date(t.dueDate).getTime())));
  const totalDays  = daysBetween(rangeStart, rangeEnd) || 1; 

  const ticks = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(rangeStart);
    d.setDate(d.getDate() + Math.round((totalDays / 4) * i));
    return d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
  });

  return (
    <div className="rounded-2xl bg-[#1f2937] p-6">
      <h3 className="mb-6 text-xl font-bold">Timeline</h3>

      {withDates.length > 0 && (
        <div className="mb-2 flex justify-between pl-[188px] pr-[90px] text-xs text-white/30">
          {ticks.map((t) => <span key={t}>{t}</span>)}
        </div>
      )}

      <div className="space-y-3">
        {withDates.map((t: any, i: number) => {
          const start = new Date(t.startDate);
          const end   = new Date(t.dueDate);
          const isOverdue = end < new Date() && t.status !== 'done';

          const leftPct  = (daysBetween(rangeStart, start) / totalDays) * 100;
          const widthPct = (daysBetween(start, end)        / totalDays) * 100;

          return (
            <motion.div key={t.id}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`../tasks/${t.id}`)}
              className="flex cursor-pointer items-center gap-4 rounded-lg p-2 hover:bg-white/5">

              {t.assignee
                ? <Avatar seed={t.assignee.fullName} size={28} />
                : <span className="h-7 w-7 shrink-0 rounded-full bg-[#374151]" />}

              <span className="w-36 shrink-0 truncate text-sm">{t.title}</span>

              <div className="relative h-6 flex-1 overflow-hidden rounded bg-[#374151]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPct}%` }}
                  transition={{ duration: 0.7, delay: i * 0.05 }}
                  className={`absolute h-full rounded ${isOverdue ? 'bg-red-600' : PRIORITY_BAR[t.priority]}`}
                  style={{ left: `${leftPct}%` }}
                />
              </div>

              <span className="w-20 shrink-0 text-right text-xs text-white/40">
                {start.toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                {' – '}
                {end.toLocaleDateString('en', { month: 'short', day: 'numeric' })}
              </span>

              <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs capitalize ${PRIORITY_STYLE[t.priority as Priority]}`}>
                {t.priority}
              </span>
            </motion.div>
          );
        })}

        {withDates.length === 0 && (
          <p className="py-8 text-center text-sm text-white/40">
            No tasks with start and due dates
          </p>
        )}
      </div>
    </div>
  );
}