import { useState } from 'react';
import Button from "../ui/Button";
import { Stagger, StaggerItem } from '../motion/Stagger';
import { useCta } from '../../hooks/useCta';
import { ContactModal } from './ContactModal';

const PRICES = {
  monthly: { individuals: '$9.99', elite: '$12.99' },
  yearly: { individuals: '$7.99', elite: '$10.39' },
};

const Check = () => (
  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#975bec]/15">
    <svg viewBox="0 0 24 24" className="h-3 w-3 text-[#975bec]" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

function Feature({ children }: { children: React.ReactNode }) {
  return <li className="flex gap-3 text-black/80"><Check />{children}</li>;
}

export default function Pricing() {
  const { goBuy } = useCta();
  const [contactOpen, setContactOpen] = useState(false);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <section className="mx-auto max-w-[1322px] px-4 py-16 md:py-24">
      <img src="/Frame 6028.svg" alt="Pricing" className="mx-auto mb-4 h-6 w-auto" />
      <h2 className="text-center font-serif text-3xl md:text-[44px] font-bold leading-tight text-black">
        Choose a plan that fits<br />your team.
      </h2>

      <div className="mt-8 flex flex-col items-center">
        <span className="text-black/70 mb-3">Choose your billing</span>
        <div className="relative flex items-center rounded-[54px] border-2 border-[#7345b3] p-1 shadow-[5px_5px_0_0_#7345b3]">
          <button
            onClick={() => setBilling('monthly')}
            className={`rounded-[54px] px-6 py-2 font-semibold transition-colors ${
              billing === 'monthly' ? 'bg-[#975bec] text-white' : 'text-black/70'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`rounded-[54px] px-6 py-2 font-semibold transition-colors ${
              billing === 'yearly' ? 'bg-[#975bec] text-white' : 'text-black/70'
            }`}
          >
            Yearly
          </button>
          <span className="absolute -right-6 -top-3 rotate-[8deg] rounded-full bg-[#ffe0d8] px-2 py-0.5 text-xs font-semibold text-[#e8582c]">
            20% Save
          </span>
        </div>
      </div>

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
        <StaggerItem>
          <div className="rounded-[14px] border border-black/[0.04] bg-white p-9">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#975bec]/10">
              <img src="/Frame 6035.svg" alt="" className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-black">Indivuals</h3>
            <p className="mt-6 text-5xl font-extrabold text-black">{PRICES[billing].individuals}</p>
            <p className="mt-2 text-black/60">{billing === 'monthly' ? 'Per month' : 'Per month, billed yearly'}</p>
            <ul className="mt-8 space-y-4">
              <Feature>Unlimited projects, clients</Feature>
              <Feature>Personal desktop activity tracking</Feature>
              <Feature>You can add 05 members on your project</Feature>
            </ul>
            <div className="mt-8">
              <Button variant="purpleOutline" icon onClick={() => goBuy('individuals', billing)}>Get Buy</Button>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="rounded-[14px] border-[4px] border-[#edf500] bg-[#faff5a] p-9 shadow-[14px_14px_0_0_#edf500]">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <img src="/Frame 6035 (1).svg" alt="" className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-black">Elite Team</h3>
            <p className="mt-6 text-5xl font-extrabold text-black">{PRICES[billing].elite}</p>
            <p className="mt-2 text-black/70">{billing === 'monthly' ? 'Per month' : 'Per month, billed yearly'}</p>
            <span className="mt-4 inline-block rounded-full bg-[#f0562e] px-4 py-1.5 text-sm font-semibold text-white">
              15 days free trails!
            </span>
            <ul className="mt-6 space-y-4">
              <Feature>Everything in Starter +</Feature>
              <Feature>Centralized control of labor costs and billable rates for team members</Feature>
              <Feature>Single sign-on (SSO)</Feature>
            </ul>
            <div className="mt-8">
              <Button variant="purpleSolid" icon onClick={() => goBuy('elite', billing)}>Get Buy</Button>
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="rounded-[14px] border border-black/[0.04] bg-white p-9">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#975bec]/10">
              <img src="/Frame 6035 (2).svg" alt="" className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-black">Startup</h3>
            <p className="mt-6 text-4xl font-extrabold text-black">Contact</p>
            <p className="mt-2 text-black/60">us to pre oder</p>
            <div className="mt-6">
              <Button variant="purpleOutline" icon onClick={() => setContactOpen(true)}>Contact Now</Button>
            </div>
            <ul className="mt-8 space-y-4">
              <Feature>Everything in Premium +</Feature>
              <Feature>Manage multiple workspaces under one Organization</Feature>
              <Feature>Expert training and assistance</Feature>
            </ul>
          </div>
        </StaggerItem>
      </Stagger>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}