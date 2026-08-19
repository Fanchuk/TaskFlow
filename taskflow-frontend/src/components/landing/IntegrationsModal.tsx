import Modal from '../ui/Modal';

const INTEGRATIONS = [
  { name: 'Slack', desc: 'Get task updates in your channels', hue: '#22d3ee' },
  { name: 'Notion', desc: 'Sync docs and databases', hue: '#8b5cf6' },
  { name: 'GitHub', desc: 'Link commits and PRs to tasks', hue: '#3b82f6' },
  { name: 'Google Calendar', desc: 'See deadlines on your calendar', hue: '#ff6b35' },
  { name: 'Figma', desc: 'Attach designs to any task', hue: '#22d3ee' },
  { name: 'Zoom', desc: 'Start calls from a project', hue: '#3b82f6' },
];

export function IntegrationsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose}>
      <h3 className="text-2xl font-bold text-white">Integrations</h3>
      <p className="mt-2 text-white/55">Connect TaskFlow with the tools your team already uses.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {INTEGRATIONS.map((it) => (
          <div key={it.name} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-sm font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${it.hue}, #8b5cf6)` }}>
              {it.name[0]}
            </span>
            <div>
              <p className="font-semibold text-white">{it.name}</p>
              <p className="text-sm text-white/50">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}