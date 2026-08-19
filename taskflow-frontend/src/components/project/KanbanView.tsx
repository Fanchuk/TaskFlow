import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, closestCorners } from '@dnd-kit/core';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { tasksService } from '../../services/tasks.service';
import { COLUMNS, type Task, type TaskStatus } from '../../types';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';
import Spinner from '../ui/Spinner';
import { useTaskFilters } from '../../hooks/useTaskFilters';
import TaskFilterBar from './TaskFilterBar';

export default function KanbanView() {
  const { projectId } = useOutletContext<{ projectId: string }>();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => tasksService.byProject(projectId),
  });

  const { search, setSearch, priority, setPriority, filtered } = useTaskFilters(tasks);

  const reorder = useMutation({
    mutationFn: tasksService.reorder,
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['tasks', projectId] });
      qc.invalidateQueries({ queryKey: ['projects'] });
      qc.invalidateQueries({ queryKey: ['dashboard'] }); 
    },
  });

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const byColumn = (status: TaskStatus) =>
    filtered.filter((t) => t.status === status).sort((a, b) => a.order - b.order);

  function handleDragStart(e: any) {
    setActiveTask(tasks.find((t) => t.id === e.active.id) ?? null);
  }

  function handleDragEnd(e: any) {
    setActiveTask(null);
    const { active, over } = e;
    if (!over) return;

    const activeId = active.id as string;
    const overColumn = COLUMNS.find((c) => c.key === over.id);
    const overTask = tasks.find((t) => t.id === over.id);
    const newStatus = (overColumn?.key ?? overTask?.status) as TaskStatus;
    if (!newStatus) return;

    const columnTasks = byColumn(newStatus).filter((t) => t.id !== activeId);
    const insertIndex = overTask ? columnTasks.findIndex((t) => t.id === overTask.id) : columnTasks.length;
    columnTasks.splice(insertIndex, 0, tasks.find((t) => t.id === activeId)!);

    const items = columnTasks.map((t, i) => ({ id: t.id, status: newStatus, order: i }));
    reorder.mutate(items);
  }

  if (isLoading) return <div className="flex justify-center py-20"><Spinner /></div>;

  return (
    <>
      <div className="mb-4 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-4 py-2.5 text-sm font-semibold hover:bg-[#4338ca]"
        >
          <Plus className="h-4 w-4" /> Add Task
        </motion.button>
      </div>

      <TaskFilterBar 
        search={search} 
        setSearch={setSearch} 
        priority={priority} 
        setPriority={setPriority} 
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.key}
              column={col}
              tasks={byColumn(col.key)}
              onTaskClick={(id) => navigate(`tasks/${id}`)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} dragging /> : null}
        </DragOverlay>
      </DndContext>

      <AddTaskModal open={addOpen} onClose={() => setAddOpen(false)} projectId={projectId} />
    </>
  );
}