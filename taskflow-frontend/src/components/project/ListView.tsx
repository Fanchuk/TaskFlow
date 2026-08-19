import { useQuery } from '@tanstack/react-query';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { tasksService } from '../../services/tasks.service';
import { COLUMNS, PRIORITY_STYLE } from '../../types';
import Spinner from '../ui/Spinner';

export default function ListView() {
  const { projectId } = useOutletContext<{ projectId: string }>();
  const navigate = useNavigate();
  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => tasksService.byProject(projectId),
  });

  if (isLoading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <div className="overflow-hidden rounded-xl border border-[#374151]">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#1f2937] text-white/60">
          <tr>
            <th className="px-5 py-3 font-medium">Task</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Priority</th>
            <th className="px-5 py-3 font-medium">Due</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr
              key={t.id}
              onClick={() => navigate(`../tasks/${t.id}`)}
              className="cursor-pointer border-t border-[#374151] hover:bg-[#1f2937]/60"
            >
              <td className="px-5 py-3 font-medium">{t.title}</td>
              <td className="px-5 py-3 text-white/70">{COLUMNS.find((c) => c.key === t.status)?.label}</td>
              <td className="px-5 py-3">
                <span className={`rounded-full px-2.5 py-1 text-xs capitalize ${PRIORITY_STYLE[t.priority]}`}>{t.priority}</span>
              </td>
              <td className="px-5 py-3 text-white/60">{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}