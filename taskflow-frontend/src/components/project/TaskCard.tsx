import { motion } from 'motion/react';
import { Calendar, MessageSquare, Paperclip } from 'lucide-react';
import { PRIORITY_STYLE, type Task } from '../../types';
import AssigneePicker from './AssigneePicker';

export default function TaskCard({ task, onClick, dragging }: { task: Task; onClick?: () => void; dragging?: boolean }) {
  return (
    <motion.div
      whileHover={dragging ? {} : { y: -3 }}
      onClick={onClick}
      className={`cursor-pointer rounded-xl border border-[#374151] bg-[#1f2937] p-4 ${dragging ? 'rotate-3 shadow-2xl' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-semibold">{task.title}</h4>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${PRIORITY_STYLE[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-white/50">
        <div className="flex items-center gap-3">
          {task.dueDate && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />{new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
          <AssigneePicker taskId={task.id} projectId={task.projectId ?? ''} current={task.assignee} />
        </div>
        <div className="flex items-center gap-3">
          {!!task._count?.comments && <span className="flex items-center gap-1"><MessageSquare className="h-4 w-4" />{task._count.comments}</span>}
          {!!task._count?.attachments && <span className="flex items-center gap-1"><Paperclip className="h-4 w-4" />{task._count.attachments}</span>}
        </div>
      </div>
    </motion.div>
  );
}