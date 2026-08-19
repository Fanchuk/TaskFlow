import { motion } from 'motion/react';
import { Paperclip, Trash2 } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { type Message } from '../../services/chat.service';

interface Props {
  message: Message;
  isMine: boolean;
  canDelete: boolean;
  onDelete: (id: string) => void;
  meFullName?: string;
}

export default function ChatMessage({ message: m, isMine, canDelete, onDelete, meFullName }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 15, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`group flex items-end gap-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
      {!isMine && <Avatar seed={m.sender.fullName} size={28} />}
      
      <div className="flex max-w-[75%] flex-col">
        {!isMine && <p className="mb-1 text-xs text-white/50">{m.sender.fullName}</p>}

        <div className={`flex items-center gap-2 ${isMine ? 'flex-row-reverse' : ''}`}>
          <div className={`rounded-2xl px-4 py-3 ${isMine ? 'rounded-br-md bg-[#4f46e5]' : 'rounded-bl-md bg-[#374151]'}`}>
            {m.text && <p className="leading-relaxed">{m.text}</p>}
            {m.fileType === 'image' && <img src={m.fileUrl!} alt="Attachment" className="mt-1 max-h-60 rounded-lg object-cover" />}
            {m.fileType === 'video' && <video src={m.fileUrl!} controls className="mt-1 max-h-60 rounded-lg" />}
            {m.fileType === 'audio' && <audio src={m.fileUrl!} controls className="mt-1 max-w-[200px] sm:max-w-full" />}
            {m.fileType === 'file' && (
              <a href={m.fileUrl!} download={m.fileName} className="mt-1 flex items-center gap-2 text-sm font-medium underline">
                <Paperclip className="h-4 w-4" /> {m.fileName}
              </a>
            )}
          </div>

          {canDelete && (
            <button onClick={() => onDelete(m.id)}
              className="hidden rounded-lg p-1.5 text-white/30 transition hover:bg-white/10 hover:text-red-400 group-hover:block">
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>

        <p className={`mt-1 text-xs text-white/40 ${isMine ? 'text-right' : 'text-left'}`}>
          {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      
      {isMine && <Avatar seed={meFullName ?? ''} size={28} />}
    </motion.div>
  );
}