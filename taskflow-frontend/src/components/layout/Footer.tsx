import Button from '../ui/Button';

const SOCIALS = [
  { name: 'LinkedIn', d: 'M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4z' },
  { name: 'Facebook', d: 'M13 3h4V0h-4a5 5 0 00-5 5v3H5v4h3v9h4v-9h3l1-4h-4V5a1 1 0 011-1z' },
  { name: 'Twitter', d: 'M22 5.8a8 8 0 01-2.3.6 4 4 0 001.8-2.2 8 8 0 01-2.5 1A4 4 0 0012 8.7 11.3 11.3 0 013.1 4.1a4 4 0 001.2 5.3 4 4 0 01-1.8-.5 4 4 0 003.2 4 4 4 0 01-1.8.1 4 4 0 003.7 2.8A8 8 0 012 17.5 11.3 11.3 0 008.1 19c7.3 0 11.3-6 11.3-11.3v-.5A8 8 0 0022 5.8z' },
];

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[1322px] px-4 pt-16 pb-8">
      <div className="grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg [background:linear-gradient(135deg,#22d3ee,#3b82f6,#8b5cf6)]">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12l4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-2xl font-bold text-white">Task<span className="tf-gradient-text">Flow</span></span>
          </div>
          <p className="mt-4 max-w-xs text-white/50">Stay organized and productive with TaskFlow.io</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white">Explore</h4>
          <ul className="mt-4 space-y-3 text-white/60">
            {['Pricing', 'Integration', 'Download', 'Blog'].map((t) => (
              <li key={t}><a href="#" className="transition-colors hover:text-white">{t}</a></li>
            ))}
            <li className="flex items-center gap-2 text-white/30">
              Features
              <span className="rounded-full bg-[#ff6b35]/20 px-2 py-0.5 text-xs font-semibold text-[#ff6b35]">Soon</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white">Keep in touch</h4>
          <form className="mt-4 inline-flex items-stretch overflow-hidden rounded-lg tf-glass p-1" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="email address" className="w-40 bg-transparent px-3 text-white placeholder-white/40 outline-none" />
            <Button variant="subscribe">Join</Button>
          </form>
          <h4 className="mt-8 text-lg font-semibold text-white">Follow us</h4>
          <div className="mt-4 flex gap-3">
            {SOCIALS.map((s) => (
              <a key={s.name} href="#" aria-label={s.name}
                className="grid h-11 w-11 place-items-center rounded-full tf-glass text-white/70 transition-colors hover:text-[#22d3ee]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d={s.d} /></svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-white/8 pt-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
        <p>© TaskFlow 2026 · All rights reserved</p>
        <div className="flex flex-wrap gap-6">
          {['Cookies', 'Privacy', 'Security', 'Legal'].map((t) => (
            <a key={t} href="#" className="transition-colors hover:text-white">{t}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}