import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function AuthAside({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="relative hidden overflow-hidden rounded-l-[28px] lg:block
                    [background:linear-gradient(160deg,#0a1330,#0a0e1c_55%,#160b1f)]">
      <motion.span className="tf-orb" style={{ width: 280, height: 280, background: 'rgba(34,211,238,0.5)', top: '-10%', left: '-10%' }}
        animate={{ x: [0, 30, 0], y: [0, 25, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.span className="tf-orb" style={{ width: 240, height: 240, background: 'rgba(255,107,53,0.4)', bottom: '-8%', right: '-6%' }}
        animate={{ x: [0, -25, 0], y: [0, -20, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, #000, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, #000, transparent 75%)',
        }} />

      <div className="relative z-10 flex h-full flex-col justify-between p-10">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl [background:linear-gradient(135deg,#22d3ee,#3b82f6,#8b5cf6)] shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12l4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-xl font-bold text-white">Task<span className="tf-gradient-text">Flow</span></span>
        </Link>

        <div className="relative my-8 h-56">
          {[
            { c: '#22d3ee', top: '0%', left: '8%', d: 0 },
            { c: '#3b82f6', top: '30%', left: '42%', d: 0.6 },
            { c: '#ff6b35', top: '58%', left: '14%', d: 1.2 },
            { c: '#8b5cf6', top: '18%', left: '66%', d: 0.9 },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="absolute tf-glass w-40 rounded-2xl p-3"
              style={{ top: card.top, left: card.left }}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: card.d }}
            >
              <span className="block h-3 w-3 rounded-md" style={{ background: card.c, boxShadow: `0 0 10px ${card.c}` }} />
              <div className="mt-2.5 h-2 w-full rounded-full bg-white/15" />
              <div className="mt-1.5 h-2 w-2/3 rounded-full bg-white/10" />
            </motion.div>
          ))}
        </div>

        <div>
          <h2 className="text-3xl font-bold leading-tight text-white">{title}</h2>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-white/70">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#22d3ee]/20">
                  <svg viewBox="0 0 24 24" className="h-3 w-3 text-[#22d3ee]" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}