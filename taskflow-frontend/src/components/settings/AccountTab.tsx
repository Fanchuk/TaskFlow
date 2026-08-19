import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { KeyRound, Smartphone, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import TabShell from './TabShell';
import ConfirmModal from '../ui/ConfirmModal';
import { settingsService } from '../../services/settings.service';
import { sessionsService } from '../../services/sessions.service';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'Active now';
  if (min < 60) return `Last active: ${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `Last active: ${h}h ago`;
  return `Last active: ${Math.floor(h / 24)}d ago`;
}

export default function AccountTab() {
  const [twoFA, setTwoFA] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data: sessions = [] } = useQuery({
    queryKey: ['sessions'],
    queryFn: sessionsService.list,
  });

  const removeSession = useMutation({
    mutationFn: sessionsService.remove,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['sessions'] });
      toast.success('Session revoked');
    },
  });

  const del = useMutation({
    mutationFn: settingsService.deleteAccount,
    onSuccess: () => {
      toast.success('Account deleted');
      logout();
      navigate('/');
    },
  });

  return (
    <TabShell title="Account Management" showFooter={false}>
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-xl border border-[#374151] bg-[#111827] p-5">
          <span className="flex items-start gap-3">
            <KeyRound className="mt-0.5 h-5 w-5 text-white/60" />
            <span>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-white/50">Add an extra layer of security to your account</p>
            </span>
          </span>
          <button
            onClick={() => { setTwoFA((v) => !v); toast.success(twoFA ? '2FA disabled' : '2FA enabled'); }}
            className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${twoFA ? 'bg-[#4f46e5]' : 'bg-[#374151]'}`}
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${twoFA ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>

        <div className="rounded-xl border border-[#374151] bg-[#111827] p-5">
          <p className="flex items-center gap-3 font-medium">
            <Smartphone className="h-5 w-5 text-white/60" /> Connected Devices
          </p>
          <div className="mt-4 space-y-4">
            {sessions.map((s) => (
              <div key={s.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {s.device} · {s.browser}
                    {s.current && (
                      <span className="ml-2 rounded bg-[#4f46e5]/20 px-2 py-0.5 text-xs text-[#a5b4fc]">
                        This device
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-white/50">
                    {s.os} · {s.ip} · {timeAgo(s.lastActive)}
                  </p>
                </div>
                {!s.current && (
                  <button
                    onClick={() => removeSession.mutate(s.id)}
                    className="text-sm font-medium text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {sessions.length === 0 && (
              <p className="text-sm text-white/40">No active sessions</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-red-900/40 bg-red-950/30 p-5">
          <span className="flex items-start gap-3">
            <Trash2 className="mt-0.5 h-5 w-5 text-red-400" />
            <span>
              <p className="font-medium text-red-400">Delete Account</p>
              <p className="text-sm text-white/50">Permanently delete your account and all data</p>
            </span>
          </span>
          <button onClick={() => setConfirmOpen(true)} className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>

      <ConfirmModal
        open={confirmOpen} onClose={() => setConfirmOpen(false)}
        onConfirm={() => del.mutate()}
        title="Delete account?" danger confirmLabel="Delete forever"
        message="This permanently deletes your account and all data. This cannot be undone."
      />
    </TabShell>
  );
}