import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, UserPlus, BarChart3 } from 'lucide-react';

export default function QuickActions() {
  const navigate = useNavigate();
  const actions = [
    { label: 'My Tasks', icon: CheckSquare, onClick: () => navigate('/tasks/my') },
    { label: 'Invite', icon: UserPlus, onClick: () => navigate('/team') },
    { label: 'Analytics', icon: BarChart3, onClick: () => navigate('/analytics') },
  ];

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {actions.map((a) => (
        <motion.button key={a.label} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={a.onClick}
          className="flex items-center gap-2 rounded-lg border border-[#374151] bg-[#1f2937] px-4 py-2.5 text-sm font-medium hover:border-[#4f46e5]">
          <a.icon className="h-4 w-4 text-[#a5b4fc]" /> {a.label}
        </motion.button>
      ))}
    </div>
  );
}