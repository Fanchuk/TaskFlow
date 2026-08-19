import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableTaskCard from './SortableTaskCard';
import type { Task } from '../../types';

export default function KanbanColumn({
  column, tasks, onTaskClick,
}: {
  column: { key: string; label: string; dot: string };
  tasks: Task[];
  onTaskClick: (id: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.key });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl bg-[#1f2937]/60 p-4 transition-colors ${isOver ? 'ring-2 ring-[#4f46e5]/50' : ''}`}
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 font-semibold">
          <span className={`h-2.5 w-2.5 rounded-full ${column.dot}`} />
          {column.label} <span className="text-white/40">({tasks.length})</span>
        </span>
      </div>

      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="mt-4 min-h-[80px] space-y-3">
          {tasks.map((t) => (
            <SortableTaskCard key={t.id} task={t} onClick={() => onTaskClick(t.id)} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}