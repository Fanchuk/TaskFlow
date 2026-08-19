import { useState } from 'react';
import Button from '../ui/Button';
import { motion } from 'motion/react';
import { fadeUp } from '../../hooks/useScrollReveal';
import { OrbitGraphic } from '../motion/Decor';
import { IntegrationsModal } from './IntegrationsModal';

function AdvCard({
  children, reverse = false,
}: { children: React.ReactNode; reverse?: boolean }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      className="tf-card p-8 md:p-12"
    >
      <div className={`grid items-center gap-10 md:grid-cols-2 ${reverse ? 'md:[direction:rtl]' : ''}`}>
        {children}
      </div>
    </motion.div>
  );
}

const Pill = ({ children, hue }: { children: React.ReactNode; hue: string }) => (
  <div className="tf-glass inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 [direction:ltr] transition-transform duration-200 hover:scale-105">
    <span className="h-2 w-2 rounded-full" style={{ background: hue, boxShadow: `0 0 8px ${hue}` }} />
    <span className="text-sm font-medium text-white/85">{children}</span>
  </div>
);

export default function Advantages() {
  const [integrations, setIntegrations] = useState(false);

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-16 md:py-24">
      <p className="text-center text-sm uppercase tracking-[0.2em] text-[#ff6b35]">Advantages</p>
      <h2 className="mt-3 text-center text-3xl md:text-[44px] font-bold leading-tight">
        A workspace teams <span className="tf-gradient-text">actually trust</span>
      </h2>
      <p className="mx-auto mt-4 max-w-md text-center text-white/55">
        Plan projects, stay on track, and deliver on time — without overworking your team.
      </p>

      <div className="mt-14 space-y-8">
        <AdvCard>
          <div className="[direction:ltr]">
            <h3 className="text-2xl md:text-[34px] font-bold leading-tight">
              Simple to use, powerful when you need it.
            </h3>
            <p className="mt-4 border-l-2 border-[#22d3ee]/40 pl-4 text-white/60 md:max-w-md">
              Create tasks and projects, upload files, and add comments — everything lives
              in one central, searchable place.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Pill hue="#22d3ee">Customize your workflow</Pill>
              <Pill hue="#3b82f6">Built for complex projects</Pill>
            </div>
          </div>
          <div className="grid place-items-center [direction:ltr]">
            <OrbitGraphic hue="cyan" />
          </div>
        </AdvCard>

        <AdvCard reverse>
          <div className="[direction:ltr]">
            <h3 className="text-2xl md:text-[34px] font-bold leading-tight">
              Take on complex projects with ease.
            </h3>
            <p className="mt-4 border-l-2 border-[#3b82f6]/40 pl-4 text-white/60 md:max-w-md">
              Live status updates show exactly how a project is progressing and what's left to do.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Pill hue="#3b82f6">Keep everyone accountable</Pill>
              <Pill hue="#8b5cf6">Always know your status</Pill>
            </div>
          </div>
          <div className="grid place-items-center [direction:ltr]">
            <OrbitGraphic hue="violet" />
          </div>
        </AdvCard>

        <AdvCard>
          <div className="[direction:ltr]">
            <h3 className="text-2xl md:text-[34px] font-bold leading-tight">
              Create calm with integrations.
            </h3>
            <p className="mt-4 border-l-2 border-[#ff6b35]/40 pl-4 text-white/60 md:max-w-md">
              Connect TaskFlow with all the tools you already use and keep your stack in sync.
            </p>
            <div className="mt-7">
              <Button variant="orangeOutline" icon onClick={() => setIntegrations(true)}>Explore integrations</Button>
            </div>
          </div>
          <div className="grid place-items-center [direction:ltr]">
            <OrbitGraphic hue="orange" />
          </div>
        </AdvCard>
      </div>

      <IntegrationsModal open={integrations} onClose={() => setIntegrations(false)} />
    </section>
  );
}