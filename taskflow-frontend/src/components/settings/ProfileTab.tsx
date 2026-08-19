import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import TabShell from './TabShell';
import { settingsService } from '../../services/settings.service';
import { useAuthStore } from '../../stores/authStore';

const field = "w-full rounded-lg border border-[#374151] bg-[#111827] px-4 py-2.5 outline-none focus:border-[#4f46e5]";

export default function ProfileTab() {
  const { user, token, setAuth } = useAuthStore();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const save = useMutation({
    mutationFn: () => settingsService.updateProfile({
      fullName,
      email,
      ...(newPassword ? { currentPassword, newPassword } : {}),
    }),
    onSuccess: (updated) => {
      if (user && token) setAuth({ token, user: { ...user, ...updated } });
      setCurrentPassword(''); 
      setNewPassword('');
      toast.success('Profile updated');
    },
    onError: () => toast.error('Could not update profile'),
  });

  return (
    <TabShell title="Profile Settings" onSave={() => save.mutate()} saving={save.isPending}>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-white/80">Full Name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} className={field} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-white/80">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={field} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-white/80">Current Password</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" className={field} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-white/80">New Password</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className={field} />
        </div>
      </div>
    </TabShell>
  );
}