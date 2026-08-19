import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../stores/authStore';
import { usersService } from '../services/users.service';
import { chatService, type Message } from '../services/chat.service';
import { useSocketEvent } from '../hooks/useSocket';
import { InviteModal } from '../components/team/InviteModal';

import ChatSidebar from '../components/chat/ChatSidebar';
import ChatHeader from '../components/chat/ChatHeader';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';

export default function TeamPage() {
  const me = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const [inviteOpen, setInviteOpen] = useState(false);
  const [msgs, setMsgs] = useState<Message[]>([]);
  
  const [activeChat, setActiveChat] = useState<{ id: string | null; name: string; status?: string }>({ 
    id: null, 
    name: 'General Chat' 
  });
  
  const activeChatRef = useRef(activeChat.id);
  useEffect(() => {
    activeChatRef.current = activeChat.id;
  }, [activeChat.id]);

  const endRef = useRef<HTMLDivElement>(null);

  const { data: members = [] } = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
  });

  const { data: history } = useQuery({
    queryKey: ['chat', activeChat.id ?? 'general'],
    queryFn: () => chatService.messages(activeChat.id ?? undefined),
    refetchOnMount: 'always',
  });

  useEffect(() => { 
    if (history) {
      setMsgs(history);
    }
  }, [history]);

  useSocketEvent<{ userId: string; status: string }>('user:status', ({ userId, status }) => {
    queryClient.setQueryData(['users'], (old: any[] = []) =>
      old.map((u) => (u.id === userId ? { ...u, status } : u))
    );
  });

  useSocketEvent<Message>('message:new', (msg) => {
    const currentChatId = activeChatRef.current;
    const isGeneral = !msg.receiverId && !currentChatId;
    const isCurrentDM = msg.senderId === currentChatId || msg.receiverId === currentChatId;
    
    if (isGeneral || isCurrentDM) {
      setMsgs((prev) => {
        if (prev.some(m => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    }
  });

  useEffect(() => { 
    endRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }, [msgs]);

  const sendMsg = useMutation({
    mutationFn: (data: any) => chatService.send({ ...data, receiverId: activeChat.id ?? undefined }),
    onSuccess: (newMessage) => {
      setMsgs((prev) => {
        if (prev.some(m => m.id === newMessage.id)) return prev;
        return [...prev, newMessage];
      });
    }
  });

  const clearChat = useMutation({
    mutationFn: () => chatService.clear(activeChat.id ?? undefined),
    onSuccess: () => {
      setMsgs([]);
      queryClient.invalidateQueries({ queryKey: ['chat', activeChat.id ?? 'general'] });
      toast.success('Chat cleared');
    },
  });

  const deleteMsg = useMutation({
    mutationFn: (messageId: string) => chatService.deleteMessage(messageId),
    onSuccess: (_, messageId) => {
      setMsgs((prev) => prev.filter((m) => m.id !== messageId));
      queryClient.invalidateQueries({ queryKey: ['chat', activeChat.id ?? 'general'] });
    },
    onError: () => toast.error('Failed to delete message'),
  });

  return (
    <div className="flex h-full flex-col px-6 py-6 md:px-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">Team Collaboration</h2>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setInviteOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-4 py-2.5 text-sm font-semibold hover:bg-[#4338ca]">
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Invite Member</span>
        </motion.button>
      </motion.div>

      <div className="mt-6 grid min-h-0 flex-1 gap-6 lg:grid-cols-[360px_1fr]">
        <ChatSidebar members={members} meId={me?.id} activeChat={activeChat} setActiveChat={setActiveChat} />

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex min-h-0 flex-col rounded-xl bg-[#1f2937]">
          <ChatHeader 
            activeChat={activeChat} 
            onClear={() => clearChat.mutate()} 
            canClear={me?.role === 'admin' || activeChat.id !== null} 
          />

          <div className="flex-1 space-y-5 overflow-y-auto p-5">
            <AnimatePresence initial={false}>
              {msgs.map((m) => (
                <ChatMessage 
                  key={m.id} 
                  message={m} 
                  isMine={m.sender.id === me?.id} 
                  canDelete={m.sender.id === me?.id || me?.role === 'admin'}
                  onDelete={(id) => deleteMsg.mutate(id)}
                  meFullName={me?.fullName}
                />
              ))}
              {msgs.length === 0 && (
                <div className="flex h-full items-center justify-center text-sm text-white/40">
                  No messages yet. Start the conversation!
                </div>
              )}
            </AnimatePresence>
            <div ref={endRef} />
          </div>

          <ChatInput onSend={(data) => sendMsg.mutate(data)} />
        </motion.div>
      </div>
      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
}