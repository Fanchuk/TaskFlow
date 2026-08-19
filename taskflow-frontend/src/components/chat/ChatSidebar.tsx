import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Users } from 'lucide-react';
import Avatar from '../ui/Avatar';

const STATUS_DOT: Record<string, string> = {
  online: 'bg-green-400', offline: 'bg-gray-500', away: 'bg-amber-400',
};
const STATUS_PILL: Record<string, string> = {
  online: 'bg-green-900/40 text-green-400',
  offline: 'bg-gray-700/50 text-gray-400',
  away: 'bg-amber-900/40 text-amber-400',
};

interface Props {
  members: any[];
  meId?: string;
  activeChat: { id: string | null; name: string; status?: string };
  setActiveChat: (chat: { id: string | null; name: string; status?: string }) => void;
}

export default function ChatSidebar({ members, meId, activeChat, setActiveChat }: Props) {
  const [query, setQuery] = useState('');

  const filtered = members.filter((m) =>
    m.fullName?.toLowerCase().includes(query.toLowerCase()) ?? true
  );

  return (
    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
      className="flex min-h-0 flex-col rounded-xl bg-[#1f2937] p-4">
      <div className="mb-4 flex items-center gap-2 rounded-lg bg-[#374151] px-4 py-3">
        <Search className="h-4 w-4 text-white/50" />
        <input value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Search members..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-white/50" />
      </div>

      <button onClick={() => setActiveChat({ id: null, name: 'General Chat' })}
        className={`mb-2 flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors ${activeChat.id === null ? 'bg-[#4f46e5]/20' : 'hover:bg-white/5'}`}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4f46e5]">
          <Users className="h-5 w-5" />
        </div>
        <span className="font-semibold">General Chat</span>
      </button>

      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        {filtered.filter(m => m.id !== meId).map((m, i) => {
          const isActive = activeChat.id === m.id;
          return (
            <motion.button key={m.id}
              initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveChat({ id: m.id, name: m.fullName, status: m.status })}
              className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors ${isActive ? 'bg-[#374151]' : 'hover:bg-white/5'}`}>
              <div className="relative">
                <Avatar seed={m.fullName} size={40} />
                <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#1f2937] ${STATUS_DOT[m.status]}`} />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{m.fullName}</p>
                <p className="text-sm text-white/50">{m.role}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs ${STATUS_PILL[m.status]}`}>{m.status}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}