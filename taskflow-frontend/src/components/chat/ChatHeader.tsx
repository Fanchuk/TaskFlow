import { Trash2, Users } from 'lucide-react';
import Avatar from '../ui/Avatar';

const STATUS_DOT: Record<string, string> = {
  online: 'bg-green-400', offline: 'bg-gray-500', away: 'bg-amber-400',
};

interface Props {
  activeChat: { id: string | null; name: string; status?: string };
  onClear: () => void;
}

export default function ChatHeader({ activeChat, onClear }: Props) {
  return (
    <div className="flex items-center justify-between border-b border-[#374151] p-5">
      <div className="flex items-center gap-3">
        <div className="relative">
          {activeChat.id ? (
            <>
              <Avatar seed={activeChat.name} size={44} />
              {activeChat.status && <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#1f2937] ${STATUS_DOT[activeChat.status]}`} />}
            </>
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4f46e5]">
              <Users className="h-5 w-5" />
            </div>
          )}
        </div>
        <div>
          <p className="font-bold">{activeChat.name}</p>
          {activeChat.status && <p className="text-sm capitalize text-white/50">{activeChat.status}</p>}
        </div>
      </div>

      <button onClick={onClear} className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-red-400 transition-colors hover:bg-red-500/10">
        <Trash2 className="h-4 w-4" /> <span className="hidden sm:inline">Clear Chat</span>
      </button>
    </div>
  );
}