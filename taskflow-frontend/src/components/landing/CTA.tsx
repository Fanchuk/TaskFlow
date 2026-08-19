import Button from '../ui/Button';
import { Reveal } from '../motion/Reveal';
import { useCta } from '../../hooks/useCta';

function DecoShape({ className, hue }: { className: string; hue: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-3xl ${className}`}
      style={{ background: `linear-gradient(135deg, ${hue}, transparent)`, boxShadow: `0 0 40px ${hue}55` }}
    />
  );
}

export default function CTA({ decor = true }: { decor?: boolean }) {
  const { goStart } = useCta();

  return (
    <>
      <section className="mx-auto max-w-[820px] px-4 py-16 text-center">
        <Reveal>
          <div className="grid mx-auto h-14 w-14 place-items-center rounded-2xl [background:linear-gradient(135deg,#22d3ee,#3b82f6,#8b5cf6)] shadow-[0_0_30px_rgba(59,130,246,0.5)]">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8l9 6 9-6M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl md:text-4xl font-bold">Still have questions?</h2>
        </Reveal>
        <p className="mx-auto mt-4 max-w-md text-white/55">
          Can't find your answer? Drop your email and we'll get back to you shortly.
        </p>
        <form className="mx-auto mt-8 flex max-w-md items-stretch overflow-hidden rounded-xl tf-glass p-1" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email" placeholder="email address"
            className="flex-1 bg-transparent px-4 text-white placeholder-white/40 outline-none"
          />
          <Button variant="subscribe">Subscribe</Button>
        </form>
      </section>

      <section className="relative mx-4 mb-16 overflow-hidden rounded-[32px] border border-white/8 [background:linear-gradient(135deg,rgba(34,211,238,0.12),rgba(59,130,246,0.08)_45%,rgba(255,107,53,0.1))] py-20 text-center md:mx-auto md:max-w-[1200px]">
        {decor && (
          <>
            <DecoShape className="right-8 top-8 h-20 w-20 hidden lg:block" hue="#22d3ee" />
            <DecoShape className="right-32 bottom-10 h-14 w-14 hidden lg:block" hue="#ff6b35" />
            <DecoShape className="left-10 top-16 h-16 w-16 hidden lg:block" hue="#8b5cf6" />
            <DecoShape className="left-24 bottom-8 h-12 w-12 hidden lg:block" hue="#3b82f6" />
          </>
        )}
        <div className="relative z-10 px-4">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Get a more<br /><span className="tf-gradient-text">productive team</span>
            </h2>
          </Reveal>
          <div className="mt-8 flex justify-center">
            <Button variant="purpleSolid" icon onClick={goStart}>Start now — free</Button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/60">
            {['14-day free trial', 'No card required', 'Cancel anytime'].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#22d3ee]" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}