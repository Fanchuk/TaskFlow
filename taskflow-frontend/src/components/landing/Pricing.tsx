import { useState } from 'react';
import { motion } from 'motion/react';
import Button from '../ui/Button';
import { Stagger, StaggerItem } from '../motion/Stagger';
import { useCta } from '../../hooks/useCta';
import { ContactModal } from './ContactModal';

const PRICES = {
  monthly: { individuals: '$9.99', elite: '$12.99' },
  yearly: { individuals: '$7.99', elite: '$10.39' },
};

const Check = ({ hue = '#22d3ee' }: { hue?: string }) => (
  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
    style={{ background: `${hue}22` }}>
    <svg viewBox="0 0 24 24" className="h-3 w-3" style={{ color: hue }} fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

function Feature({ children, hue }: { children: React.ReactNode; hue?: string }) {
  return <li className="flex gap-3 text-white/70"><Check hue={hue} />{children}</li>;
}

export default function Pricing() {
  const { goBuy } = useCta();
  const [contactOpen, setContactOpen] = useState(false);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <section id="pricing" className="mx-auto max-w-[1200px] px-4 py-16 md:py-24">
      <p className="text-center text-sm uppercase tracking-[0.2em] text-[#3b82f6]">Pricing</p>
      <h2 className="mt-3 text-center text-3xl md:text-[44px] font-bold leading-tight">
        Choose a plan that <span className="tf-gradient-text">fits your team</span>
      </h2>

      <div className="mt-8 flex flex-col items-center">
        <div className="tf-glass relative flex items-center rounded-full p-1">
          {(['monthly', 'yearly'] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              className="relative rounded-full px-6 py-2 text-sm font-semibold transition-colors"
            >
              {billing === b && (
                <motion.span
                  layoutId="billpill"
                  className="absolute inset-0 rounded-full [background:linear-gradient(110deg,#22d3ee,#3b82f6)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${billing === b ? 'text-white' : 'text-white/60'}`}>
                {b === 'monthly' ? 'Monthly' : 'Yearly'}
              </span>
            </button>
          ))}
          <span className="absolute -right-4 -top-3 rotate-6 rounded-full bg-[#ff6b35] px-2 py-0.5 text-[11px] font-semibold text-white shadow-[0_0_14px_rgba(255,107,53,0.6)]">
            Save 20%
          </span>
        </div>
      </div>

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
        <StaggerItem>
          <div className="tf-card p-8">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#22d3ee]/15">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#22d3ee]" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-white">Individuals</h3>
            <p className="mt-5 text-5xl font-bold text-white">{PRICES[billing].individuals}</p>
            <p className="mt-2 text-white/45">{billing === 'monthly' ? 'per month' : 'per month, billed yearly'}</p>
            <ul className="mt-7 space-y-3.5">
              <Feature>Unlimited projects & clients</Feature>
              <Feature>Personal activity tracking</Feature>
              <Feature>Add up to 5 members per project</Feature>
            </ul>
            <div className="mt-8">
              <Button variant="purpleOutline" icon onClick={() => goBuy('individuals', billing)} className="w-full">Get started</Button>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="tf-card relative p-8 [background:linear-gradient(180deg,rgba(59,130,246,0.14),rgba(139,92,246,0.06))]">
            <div className="pointer-events-none absolute -inset-px rounded-[24px] [background:linear-gradient(120deg,#22d3ee,#3b82f6,#8b5cf6)] opacity-60"
              style={{ WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: 1 }} />
            <div className="grid h-12 w-12 place-items-center rounded-xl [background:linear-gradient(135deg,#3b82f6,#8b5cf6)]">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-white">Elite Team</h3>
            <p className="mt-5 text-5xl font-bold text-white">{PRICES[billing].elite}</p>
            <p className="mt-2 text-white/55">{billing === 'monthly' ? 'per month' : 'per month, billed yearly'}</p>
            <span className="mt-4 inline-block rounded-full bg-[#ff6b35] px-4 py-1.5 text-sm font-semibold text-white shadow-[0_0_16px_rgba(255,107,53,0.5)]">
              15-day free trial
            </span>
            <ul className="mt-6 space-y-3.5">
              <Feature hue="#8b5cf6">Everything in Individuals +</Feature>
              <Feature hue="#8b5cf6">Centralized cost & billable rates</Feature>
              <Feature hue="#8b5cf6">Single sign-on (SSO)</Feature>
            </ul>
            <div className="mt-8">
              <Button variant="purpleSolid" icon onClick={() => goBuy('elite', billing)} className="w-full">Get started</Button>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="tf-card p-8">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#ff6b35]/15">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#ff6b35]" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16v12H4zM4 20h16M9 16v4M15 16v4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-white">Startup</h3>
            <p className="mt-5 text-4xl font-bold text-white">Custom</p>
            <p className="mt-2 text-white/45">contact us to pre-order</p>
            <div className="mt-6">
              <Button variant="purpleOutline" icon onClick={() => setContactOpen(true)} className="w-full">Contact us</Button>
            </div>
            <ul className="mt-8 space-y-3.5">
              <Feature hue="#ff6b35">Everything in Elite +</Feature>
              <Feature hue="#ff6b35">Multiple workspaces per org</Feature>
              <Feature hue="#ff6b35">Expert training & assistance</Feature>
            </ul>
          </div>
        </StaggerItem>
      </Stagger>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}