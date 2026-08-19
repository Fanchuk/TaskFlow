import { useState } from 'react';
import { motion } from 'motion/react';
import CTA from '../components/landing/CTA';
import { detectOS } from '../hooks/useOS';
import { DownloadModal } from '../components/landing/DownloadModal';
import { Reveal } from '../components/motion/Reveal';
import { DashboardMock } from '../components/motion/Decor';

function OSButton({
  active, onClick, label, children, primary,
}: {
  active: boolean; onClick: () => void; label: string; children: React.ReactNode; primary?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={onClick}
      className={`tf-focus relative inline-flex items-center justify-center gap-3 rounded-xl px-7 py-4 font-semibold text-white ${
        primary
          ? 'tf-neon-btn [background:linear-gradient(110deg,#22d3ee,#3b82f6,#8b5cf6)]'
          : 'tf-glass border-white/15 hover:border-[#22d3ee]/50'
      }`}
    >
      {children}
      {label}
      {active && (
        <motion.span
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="absolute -right-2 -top-2 rounded-full bg-[#ff6b35] px-2 py-0.5 text-xs text-white shadow-[0_0_12px_rgba(255,107,53,0.6)]"
        >
          You
        </motion.span>
      )}
    </motion.button>
  );
}

export default function Download() {
  const os = detectOS();
  const [dl, setDl] = useState<null | 'windows' | 'mac'>(null);

  return (
    <>
      <section className="mx-auto max-w-[1200px] px-4 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="tf-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#22d3ee] shadow-[0_0_10px_#22d3ee] tf-glow" />
              Desktop app
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl md:text-[56px]">
              TaskFlow for<br /><span className="tf-gradient-text">your desktop.</span>
            </h1>
            <p className="mt-5 max-w-md text-white/60 md:text-lg">
              An all-in-one task manager that works on your desktop and in your browser.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <OSButton primary active={os === 'windows'} onClick={() => setDl('windows')} label="Windows">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M3 5.5l7-1v7H3zM11 4.4l10-1.4v9.5H11zM3 12.5h7v7l-7-1zM11 12.5h10V22l-10-1.4z" /></svg>
              </OSButton>
              <OSButton active={os === 'mac'} onClick={() => setDl('mac')} label="macOS">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M16 3a4 4 0 01-1 2.7A3.7 3.7 0 0112 7a4 4 0 011-2.6A4.2 4.2 0 0116 3zm3 14.6a9 9 0 01-1 1.9c-.6.9-1.1 1.5-1.6 1.8-.5.4-1.1.5-1.7.5-.5 0-1-.1-1.7-.4-.7-.3-1.2-.4-1.7-.4s-1.1.1-1.8.4c-.7.3-1.2.4-1.6.4-.6 0-1.2-.2-1.8-.6-.5-.3-1-.9-1.6-1.8A11 11 0 013 14.5c-.4-1.2-.6-2.3-.6-3.4 0-1.3.3-2.4.8-3.3A4.7 4.7 0 019 5.5c.5 0 1.1.2 1.9.5.8.3 1.2.5 1.5.5.2 0 .8-.2 1.7-.5.9-.3 1.6-.5 2.2-.4 1.6.1 2.8.8 3.6 2a4.3 4.3 0 00-2.1 3.8c0 1.2.4 2.2 1.3 3 .4.4.8.7 1.3.9-.1.3-.2.7-.4 1z" /></svg>
              </OSButton>
            </div>

            <p className="mt-6 text-sm text-white/40">Windows 10 or later · Mac with Apple silicon</p>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            animate={{ y: [0, -12, 0] }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] [background:radial-gradient(ellipse_at_center,rgba(59,130,246,0.3),transparent_70%)] blur-2xl" />
            <DashboardMock />
          </motion.div>
        </div>
      </section>

      <CTA decor={false} />

      {dl && <DownloadModal open onClose={() => setDl(null)} os={dl} />}
    </>
  );
}