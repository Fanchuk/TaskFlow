import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Button from '../ui/Button';
import { useCta } from '../../hooks/useCta';

const NAV = [
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Download', href: '/download', route: true },
  { label: 'Integrations', href: '/#integrations' },
];

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0">
      <span className="grid h-9 w-9 place-items-center rounded-xl [background:linear-gradient(135deg,#22d3ee,#3b82f6,#8b5cf6)] shadow-[0_0_20px_rgba(59,130,246,0.5)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12l4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
        Task<span className="tf-gradient-text">Flow</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const { goStart } = useCta();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goToSection = (href: string) => {
    setOpen(false);
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (pathname !== '/') {
        navigate('/');
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 mx-auto max-w-[1322px] px-4 pt-5 md:pt-6">
      <div className="tf-glass flex items-center justify-between rounded-2xl px-5 py-3.5 md:px-7 md:h-[76px]">
        <div className="flex items-center gap-8 lg:gap-12">
          <Logo />
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {NAV.map((item) =>
              item.route ? (
                <Link key={item.label} to={item.href} className="text-[15px] text-white/70 transition-colors hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <button key={item.label} onClick={() => goToSection(item.href)} className="text-[15px] text-white/70 transition-colors hover:text-white">
                  {item.label}
                </button>
              )
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={goStart} className="text-[14px] md:text-[15px] hidden sm:inline-flex">
            Join Free
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-[5px] p-2"
            aria-label="Menu"
            aria-expanded={open}
          >
            <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="h-0.5 w-6 bg-white" />
            <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="h-0.5 w-6 bg-white" />
            <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="h-0.5 w-6 bg-white" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="tf-glass mt-3 flex flex-col gap-1 rounded-2xl p-4">
              {NAV.map((item) =>
                item.route ? (
                  <Link key={item.label} to={item.href} onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-[15px] text-white/80 hover:bg-white/5">
                    {item.label}
                  </Link>
                ) : (
                  <button key={item.label} onClick={() => goToSection(item.href)}
                    className="w-full text-left rounded-xl px-4 py-3 text-[15px] text-white/80 hover:bg-white/5">
                    {item.label}
                  </button>
                )
              )}
              <Button variant="purpleSolid" onClick={goStart} className="mt-2 w-full">Join Free</Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}