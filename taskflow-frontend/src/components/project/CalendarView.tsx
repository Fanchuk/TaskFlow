import { useQuery } from '@tanstack/react-query';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { tasksService } from '../../services/tasks.service';
import { PRIORITY_STYLE } from '../../types';
import Spinner from '../ui/Spinner';

export default function CalendarView() {
  const { projectId } = useOutletContext<{ projectId: string }>();
  const navigate = useNavigate();
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => tasksService.byProject(projectId),
  });

  if (isLoading) return <div className="flex justify-center py-20"><Spinner /></div>;

  const groups = tasks.reduce<Record<string, typeof tasks>>((acc, t) => {
    const key = t.dueDate ? new Date(t.dueDate).toLocaleDateString() : 'No date';
    (acc[key] ??= []).push(t);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(groups).map(([date, list]) => (
        <div key={date}>
          <h3 className="text-lg font-bold">{date}</h3>
          <div className="mt-4 space-y-3">
            {list.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                onClick={() => navigate(`../tasks/${t.id}`)}
                className="cursor-pointer rounded-2xl border border-[#374151] bg-[#1f2937] p-5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold">{t.title}</h4>
                  <span className={`rounded-full px-2.5 py-1 text-xs capitalize ${PRIORITY_STYLE[t.priority]}`}>{t.priority}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}