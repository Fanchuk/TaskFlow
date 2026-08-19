import { Users, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const STATUS = {
  active: 'bg-green-900/40 text-green-400',
  'on-hold': 'bg-amber-900/40 text-amber-400',
  completed: 'bg-blue-900/40 text-blue-400',
};

const COLORS: Record<string, string> = {
  indigo: 'bg-[#4f46e5]',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  green: 'bg-green-500',
  amber: 'bg-amber-500',
};

export default function ProjectCard({
  title, desc, status, color, members, progress, onClick,
}: {
  title: string; desc: string; status: string; color: string;
  members: number; progress: number; onClick?: () => void;
}) {
  const barColor = COLORS[color] ?? COLORS.indigo;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4, borderColor: '#4f46e5' }}
      className="cursor-pointer rounded-lg border border-[#374151] bg-[#1f2937] p-5 transition-colors"
    >
      <div className="flex items-start justify-between">
        <span className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-bold text-white ${barColor}`}>
          {title.charAt(0)}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS[status] ?? STATUS.active}`}>
          {status}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
      <p className="mt-1 text-sm text-white/60">{desc}</p>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#374151]">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-white/60">
        <span className="flex items-center gap-1.5"><Users className="h-4 w-4" />{members} members</span>
        <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{progress}% complete</span>
      </div>
    </motion.div>
  );
}