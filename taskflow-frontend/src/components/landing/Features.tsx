import { motion } from 'motion/react';
import { container, scaleIn } from '../../hooks/useScrollReveal';

const FEATURES = [
  {
    title: 'Task progress',
    desc: 'Visual boards and live status so nothing slips through the cracks.',
    hue: '#22d3ee',
    icon: (
      <path d="M4 12h6M4 6h10M4 18h8M16 15l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Plan calendar',
    desc: 'Drag, drop and schedule work across weeks without the mess.',
    hue: '#3b82f6',
    icon: (
      <path d="M3 8h18M7 3v4M17 3v4M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Collaboration',
    desc: 'Comment, mention and share files in one central place.',
    hue: '#ff6b35',
    icon: (
      <path d="M17 20a5 5 0 00-10 0M12 12a4 4 0 100-8 4 4 0 000 8zM20 8v6M23 11h-6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-16 md:py-24">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={container}>
        <motion.p variants={scaleIn} className="text-center text-sm uppercase tracking-[0.2em] text-[#22d3ee]">
          Features
        </motion.p>
        <motion.h2 variants={scaleIn} className="mt-3 text-center text-3xl md:text-[44px] font-bold leading-tight">
          Both familiar <span className="tf-gradient-text">and new.</span>
        </motion.h2>
      </motion.div>

      <motion.div
        className="mt-14 grid gap-6 md:grid-cols-3"
        initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={container}
      >
        {FEATURES.map((f) => (
          <motion.div
            key={f.title}
            variants={scaleIn}
            className="tf-card group p-7 md:p-8 transition-transform duration-300 hover:-translate-y-2"
          >
            <div
              className="grid h-14 w-14 place-items-center rounded-2xl"
              style={{ background: `radial-gradient(circle, ${f.hue}33, transparent 70%)` }}
            >
              <motion.svg
                viewBox="0 0 24 24" className="h-7 w-7" fill="none" strokeWidth="2"
                style={{ color: f.hue }}
                whileHover={{ rotate: 8 }}
              >
                {f.icon}
              </motion.svg>
            </div>
            <h3 className="mt-6 text-xl font-bold text-white">{f.title}</h3>
            <p className="mt-2.5 text-white/55">{f.desc}</p>
            <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${f.hue}, transparent)` }}
                initial={{ width: '15%' }}
                whileInView={{ width: '70%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}