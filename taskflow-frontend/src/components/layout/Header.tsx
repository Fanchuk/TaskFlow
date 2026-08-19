import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Button from '../ui/Button';
import { useCta } from '../../hooks/useCta';

const NAV = [
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Download', href: '/download', route: true },
  { label: 'Integrations', href: '/#integrations' },
];

export default function Header() {
  const { goStart } = useCta();
  const [open, setOpen] = useState(false);

  return (
    <header className="mx-auto max-w-[1322px] px-4 pt-6 md:pt-8">
      <div className="flex items-center justify-between rounded-[27px] bg-white px-5 py-4 md:px-8 md:h-[100px] shadow-[0_9px_113px_0_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-8 lg:gap-12">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/Container.png" alt="Task Flow" className="h-8 w-8 rounded-md object-cover" />
            <span className="font-serif text-xl md:text-2xl font-bold text-black">Task Flow</span>
          </Link>
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {NAV.map((item) =>
              item.route ? (
                <Link key={item.label} to={item.href} className="text-[18px] text-black/90 hover:text-black">
                  {item.label}
                </Link>
              ) : (
                <a key={item.label} href={item.href} className="text-[18px] text-black/90 hover:text-black">
                  {item.label}
                </a>
              )
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={goStart} className="text-[15px] md:text-[17px]">
            Join Free
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-[5px] p-2"
            aria-label="Menu"
            aria-expanded={open}
          >
            <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="h-0.5 w-6 bg-black" />
            <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="h-0.5 w-6 bg-black" />
            <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="h-0.5 w-6 bg-black" />
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
            <div className="mt-3 flex flex-col gap-1 rounded-[20px] bg-white p-4 shadow-[0_9px_113px_0_rgba(0,0,0,0.03)]">
              {NAV.map((item) =>
                item.route ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-[16px] text-black/90 hover:bg-black/5"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-[16px] text-black/90 hover:bg-black/5"
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}