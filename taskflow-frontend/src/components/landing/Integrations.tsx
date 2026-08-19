import { motion } from 'motion/react';

const LOGOS = ['Notion', 'Slack', 'Trello', 'Outlook', 'Calendar', 'Figma', 'GitHub', 'Zoom'];

function Chip({ name }: { name: string }) {
  return (
    <div className="tf-glass flex shrink-0 items-center gap-2.5 rounded-full px-5 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full [background:linear-gradient(135deg,#22d3ee,#8b5cf6)]" />
      <span className="text-sm font-medium text-white/70">{name}</span>
    </div>
  );
}

export default function Integrations() {
  const row = [...LOGOS, ...LOGOS];
  return (
    <section id="integrations" className="mx-auto max-w-[1322px] px-4 py-14">
      <p className="mb-8 text-center text-sm uppercase tracking-[0.2em] text-white/40">
        Works with your favorite tools
      </p>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)',
          WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)',
        }}
      >
        <motion.div
          className="flex w-max gap-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        >
          {row.map((l, i) => <Chip key={i} name={l} />)}
        </motion.div>
      </div>
    </section>
  );
}