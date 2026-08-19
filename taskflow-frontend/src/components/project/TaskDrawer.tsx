import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { X, Link2, Send, Paperclip } from 'lucide-react';
import { tasksService, commentsService, attachmentsService } from '../../services/tasks.service';
import { PRIORITY_STYLE } from '../../types';
import Avatar from '../ui/Avatar';
import Spinner from '../ui/Spinner';

export default function TaskDrawer() {
  const { id: projectId, taskId } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [comment, setComment] = useState('');

  const { data: task, isLoading } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => tasksService.detail(taskId!),
    enabled: !!taskId,
  });

  const close = () => navigate(`/projects/${projectId}/kanban`);

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ['task', taskId] });
    qc.invalidateQueries({ queryKey: ['tasks', projectId] });
    qc.invalidateQueries({ queryKey: ['projects'] });
    qc.invalidateQueries({ queryKey: ['dashboard'] });
  };

  const addComment = useMutation({
    mutationFn: () => commentsService.create(taskId!, comment),
    onSuccess: () => { setComment(''); invalidate(); },
  });

  const addFile = useMutation({
    mutationFn: (f: File) => attachmentsService.create(taskId!, { name: f.name, size: f.size, mime: f.type }),
    onSuccess: () => { toast.success('File attached'); invalidate(); },
  });

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied');
  };

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/50" onClick={close} />

        <motion.aside
          initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="drawer-scroll absolute right-0 top-0 h-full w-full max-w-[520px] overflow-y-auto border-l border-[#374151] bg-[#111827] text-white"
        >
          {isLoading || !task ? (
            <div className="flex h-full items-center justify-center"><Spinner /></div>
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={copyLink} className="rounded-lg p-2 text-white/60 hover:bg-white/10" title="Copy link">
                    <Link2 className="h-5 w-5" />
                  </button>
                </div>
                <button onClick={close} className="rounded-lg p-2 text-white/60 hover:bg-white/10">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${PRIORITY_STYLE[task.priority]}`}>
                {task.priority} priority
              </span>
              <h2 className="mt-3 text-2xl font-bold">{task.title}</h2>
              <p className="mt-1 text-sm text-white/50">in {task.project.title}</p>

              <section className="mt-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Attachments</h3>
                  <label className="flex cursor-pointer items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300">
                    <Paperclip className="h-4 w-4" /> Attach
                    <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && addFile.mutate(e.target.files[0])} />
                  </label>
                </div>
                <div className="mt-3 space-y-2">
                  {task.attachments.length === 0 && <p className="text-sm text-white/40">No files yet.</p>}
                  {task.attachments.map((a) => (
                    <div key={a.id} className="flex items-center justify-between rounded-lg bg-[#1f2937] px-3 py-2 text-sm">
                      <span className="truncate">{a.name}</span>
                      <span className="text-white/40">{(a.size / 1024).toFixed(0)} KB</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-8">
                <h3 className="font-semibold">Activity</h3>
                <div className="mt-3 flex gap-2">
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && comment.trim() && addComment.mutate()}
                    placeholder="Write a comment..."
                    className="flex-1 rounded-lg border border-[#4b5563] bg-[#374151] px-4 py-2.5 text-sm outline-none focus:border-[#6366f1]"
                  />
                  <button
                    onClick={() => comment.trim() && addComment.mutate()}
                    className="rounded-lg bg-[#4f46e5] px-3 hover:bg-[#4338ca]"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  {task.comments.map((c) => (
                    <div key={c.id} className="flex gap-3">
                      <Avatar seed={c.author.fullName} size={32} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{c.author.fullName}</span>
                          <span className="text-xs text-white/40">{new Date(c.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="mt-0.5 text-sm text-white/80">{c.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}