import { motion } from 'motion/react';

export function Backdrop() {
  return (
    <>
      <div className="tf-bg" aria-hidden />
      <div className="tf-grid" aria-hidden />
      <FloatingOrbs />
    </>
  );
}

export function FloatingOrbs() {
  const orbs = [
    { c: 'rgba(59,130,246,0.4)', s: 500, top: '-6%', left: '-8%' },
    { c: 'rgba(255,107,53,0.28)', s: 400, bottom: '-4%', right: '10%' },
  ];
  return (
    <div className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden" style={{ contain: 'strict' }} aria-hidden>
      {orbs.map((o, i) => (
        <motion.span
          key={i}
          className="tf-orb"
          style={{ width: o.s, height: o.s, background: o.c, top: o.top, left: o.left, right: o.right, bottom: o.bottom }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export function DashboardMock({ className = '' }: { className?: string }) {
  const bars = [40, 72, 55, 88, 63, 95, 48, 78];
  return (
    <div className={`tf-card p-5 md:p-7 ${className}`}>
      
      <div className="mb-5 flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-[#ff6b35]" />
        <span className="h-3 w-3 rounded-full bg-[#facc15]/70" />
        <span className="h-3 w-3 rounded-full bg-[#22d3ee]" />
        <div className="ml-3 h-2 w-40 rounded-full bg-white/10" />
      </div>

      <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-2.5 w-24 rounded-full bg-white/15" />
            <div className="h-6 w-16 rounded-full [background:linear-gradient(90deg,#22d3ee,#3b82f6)]" />
          </div>
          <div className="flex h-36 items-end gap-2.5">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 origin-bottom rounded-md [background:linear-gradient(180deg,#22d3ee,#3b82f6)]"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {['#22d3ee', '#3b82f6', '#8b5cf6', '#ff6b35'].map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-3"
            >
              <span className="h-4 w-4 shrink-0 rounded-md" style={{ background: c }} />
              <div className="flex-1 space-y-1.5">
                <div className="h-2 w-full rounded-full bg-white/12" />
                <div className="h-2 w-2/3 rounded-full bg-white/8" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/8">
        <div className="h-full w-[70%] [background:linear-gradient(90deg,#22d3ee,#3b82f6,#8b5cf6)]" />
      </div>
    </div>
  );
}

export function OrbitGraphic({ hue = 'blue' }: { hue?: 'blue' | 'cyan' | 'orange' | 'violet' }) {
  const map = {
    blue: '#3b82f6', cyan: '#22d3ee', orange: '#ff6b35', violet: '#8b5cf6',
  } as const;
  const color = map[hue];
  return (
    <div className="relative grid aspect-square w-full max-w-[300px] place-items-center">
      {[110, 78, 46].map((r, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{ width: r * 2, height: r * 2, borderColor: `${color}44` }}
          animate={{ rotate: i % 2 ? -360 : 360 }}
          transition={{ duration: 14 + i * 6, repeat: Infinity, ease: 'linear' }}
        >
          <span
            className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full"
            style={{ background: color, boxShadow: `0 0 16px ${color}` }}
          />
        </motion.div>
      ))}
      <motion.div
        className="grid h-16 w-16 place-items-center rounded-2xl"
        style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="h-8 w-8 rounded-lg tf-glass" />
      </motion.div>
    </div>
  );
}