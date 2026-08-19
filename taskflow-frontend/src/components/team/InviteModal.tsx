import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, ChevronDown } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { invitationsService } from '../../services/invitations.service';

const PROJECTS = [
  'Website Redesign', 'Mobile App Development', 'Marketing Campaign',
  'User Research', 'Content Strategy',
];

export function InviteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const toggle = (p: string) =>
    setSelected((s) => (s.includes(p) ? s.filter((x) => x !== p) : [...s, p]));

  const { mutate, isPending } = useMutation({
    mutationFn: () => invitationsService.create({ email, role, projects: selected, message }),
    onSuccess: () => {
      toast.success(`Invitation sent to ${email}`);
      onClose();
      setEmail(''); setSelected([]); setMessage('');
    },
    onError: () => toast.error('Could not send invitation'),
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl bg-[#1f2937] p-6 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Invite Team Member</h3>
              <button onClick={onClose} className="text-white/60 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <label className="mt-6 block text-sm text-white/70">Email Address</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@example.com"
              className="mt-2 w-full rounded-lg border border-[#374151] bg-[#111827] px-4 py-3 outline-none placeholder:text-white/40 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/40"
            />

            <label className="mt-5 block text-sm text-white/70">Role</label>
            <div className="relative mt-2">
              <select
                value={role} onChange={(e) => setRole(e.target.value)}
                className="w-full appearance-none rounded-lg border border-[#374151] bg-[#111827] px-4 py-3 outline-none focus:border-[#4f46e5]"
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
                <option value="viewer">Viewer</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            </div>

            <label className="mt-5 block text-sm text-white/70">Projects</label>
            <div className="mt-2 max-h-40 space-y-2 overflow-y-auto rounded-lg border border-[#374151] bg-[#111827] p-3">
              {PROJECTS.map((p) => (
                <label key={p} className="flex cursor-pointer items-center gap-3 rounded px-1 py-1 hover:bg-white/5">
                  <input
                    type="checkbox" checked={selected.includes(p)} onChange={() => toggle(p)}
                    className="h-4 w-4 rounded border-white/30 bg-transparent accent-[#4f46e5]"
                  />
                  <span className="text-sm">{p}</span>
                </label>
              ))}
            </div>

            <label className="mt-5 block text-sm text-white/70">Personal Message (Optional)</label>
            <textarea
              value={message} onChange={(e) => setMessage(e.target.value)} rows={3}
              placeholder="Write a message to include in the invitation email..."
              className="mt-2 w-full resize-none rounded-lg border border-[#374151] bg-[#111827] px-4 py-3 outline-none placeholder:text-white/40 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/40"
            />

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={onClose} className="rounded-lg px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5">
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => mutate()} disabled={!email.trim() || isPending}
                className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-4 py-2.5 text-sm font-semibold hover:bg-[#4338ca] disabled:opacity-50"
              >
                <Mail className="h-4 w-4" /> {isPending ? 'Sending...' : 'Send Invitation'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}