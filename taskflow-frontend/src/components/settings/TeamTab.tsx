import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserPlus, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import TabShell from './TabShell';
import Avatar from '../ui/Avatar';
import { usersService } from '../../services/users.service';
import { settingsService } from '../../services/settings.service';
import { authService } from '../../services/auth.service';
import { InviteModal } from '../team/InviteModal';

export default function TeamTab() {
  const qc = useQueryClient();
  const [inviteOpen, setInviteOpen] = useState(false);

  const { data: members = [] } = useQuery({ queryKey: ['users'], queryFn: usersService.getAll });
  const { data: me } = useQuery({ queryKey: ['me'], queryFn: authService.getMe });
  const isAdmin = me?.role === 'admin';

  const changeRole = useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => settingsService.updateRole(id, role),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      toast.success('Role updated');
    },
  });

  return (
    <TabShell title="Team & Permissions" showFooter={false}>
      <div className="space-y-3">
        {members.map((m) => (
          <div key={m.id} className="flex items-center gap-3 rounded-xl border border-[#374151] bg-[#111827] p-4">
            <Avatar seed={m.fullName} size={44} />
            <div className="flex-1">
              <p className="font-semibold">{m.fullName}</p>
              <p className="text-sm text-white/50">{m.email}</p>
            </div>
            <div className="relative w-32">
              <select
                value={m.role.charAt(0).toUpperCase() + m.role.slice(1)}
                onChange={(e) => changeRole.mutate({ id: m.id, role: e.target.value.toLowerCase() })}
                disabled={!isAdmin}
                className={`w-full appearance-none rounded-lg border border-[#374151] bg-[#111827] py-2.5 pl-4 pr-10 text-sm outline-none focus:border-[#4f46e5] ${!isAdmin ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                <option>Admin</option><option>Member</option><option>Viewer</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
            </div>
          </div>
        ))}
        {isAdmin && (
          <button onClick={() => setInviteOpen(true)} className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#374151] bg-[#111827] py-3.5 text-sm font-medium text-white/80 hover:bg-white/5">
            <UserPlus className="h-4 w-4" /> Invite New Team Member
          </button>
        )}
      </div>

      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </TabShell>
  );
}