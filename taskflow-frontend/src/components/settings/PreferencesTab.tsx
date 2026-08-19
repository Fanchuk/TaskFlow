import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Sun, Globe, Bell, LayoutTemplate, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import TabShell from './TabShell';
import { authService } from '../../services/auth.service';
import { settingsService, type UserSettings } from '../../services/settings.service';

function Row({ icon: Icon, label, children }: { icon: any; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-4">
      <span className="flex items-center gap-3 text-white/90"><Icon className="h-5 w-5 text-white/60" />{label}</span>
      {children}
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${on ? 'bg-[#4f46e5]' : 'bg-[#374151]'}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${on ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  );
}

export default function PreferencesTab() {
  const { data: me } = useQuery({ queryKey: ['me'], queryFn: authService.getMe });
  const [prefs, setPrefs] = useState<UserSettings>({
    theme: 'dark', language: 'English', notifications: true, defaultView: 'Kanban',
  });

  useEffect(() => {
    if (me?.settings) setPrefs((p) => ({ ...p, ...me.settings }));
  }, [me]);

  const save = useMutation({
    mutationFn: () => settingsService.updateSettings(prefs),
    onSuccess: () => toast.success('Preferences saved'),
  });

  const selectCls = 'appearance-none rounded-lg border border-[#374151] bg-[#111827] py-2.5 pl-4 pr-10 text-sm outline-none focus:border-[#4f46e5]';

  return (
    <TabShell title="Preferences" onSave={() => save.mutate()} saving={save.isPending}>
      <div className="divide-y divide-[#374151]">
        <Row icon={Sun} label="Theme Mode">
          <Toggle on={prefs.theme === 'dark'} onChange={() => setPrefs((p) => ({ ...p, theme: p.theme === 'dark' ? 'light' : 'dark' }))} />
        </Row>
        <Row icon={Globe} label="Language">
          <div className="relative w-36">
            <select value={prefs.language} onChange={(e) => setPrefs((p) => ({ ...p, language: e.target.value }))} className={`w-full ${selectCls}`}>
              <option>English</option><option>Ukrainian</option><option>Deutsch</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          </div>
        </Row>
        <Row icon={Bell} label="Task Notifications">
          <Toggle on={!!prefs.notifications} onChange={() => setPrefs((p) => ({ ...p, notifications: !p.notifications }))} />
        </Row>
        <Row icon={LayoutTemplate} label="Default Task View">
          <div className="relative w-36">
            <select value={prefs.defaultView} onChange={(e) => setPrefs((p) => ({ ...p, defaultView: e.target.value as any }))} className={`w-full ${selectCls}`}>
              <option>Kanban</option><option>List</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          </div>
        </Row>
      </div>
    </TabShell>
  );
}