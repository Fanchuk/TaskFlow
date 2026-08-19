import Button from "../ui/Button";
import { motion } from 'motion/react';
import { Reveal } from '../motion/Reveal';

export default function CTA({ decor = true }: { decor?: boolean }) {
  return (
    <>
      <section className="mx-auto max-w-[900px] px-4 py-16 text-center">
        <img src="/Group 6089.png" alt="" className="mx-auto h-14 w-auto" />
        <Reveal>
          <h2 className="mt-6 text-3xl md:text-4xl font-extrabold text-black">Still have an questions?</h2>
        </Reveal>
        <p className="mt-4 text-black/70 max-w-md mx-auto">
          If you cann't find answer to your question in our FAQm, you can always contact us. We'l answer to you shortly!
        </p>
        <form className="mt-8 inline-flex items-stretch" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email" placeholder="email address"
            className="w-64 rounded-l-lg border border-r-0 border-black/10 px-4 py-3.5 outline-none focus:border-[#975bec]"
          />
          <Button variant="subscribe" className="rounded-l-none">Subscribe</Button>
        </form>
      </section>

      <section className="relative overflow-hidden bg-[#faf9e3] py-20 text-center">
        {decor && (
          <>
            <motion.img
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              src="/Rectangle 79 (1).png" alt="" aria-hidden
              className="pointer-events-none absolute -right-10 top-6 hidden w-72 rotate-[8deg] opacity-90 lg:block"
            />
            <motion.img
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              src="/Rectangle 78 (1).png" alt="" aria-hidden
              className="pointer-events-none absolute right-0 top-24 hidden w-64 rotate-[23deg] lg:block"
            />
            <motion.img
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              src="/Rectangle 77 (1).png" alt="" aria-hidden
              className="pointer-events-none absolute -right-6 bottom-0 hidden w-56 -rotate-[12deg] lg:block"
            />
            <motion.img
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              src="/Rectangle 76 (1).png" alt="" aria-hidden
              className="pointer-events-none absolute right-24 bottom-6 hidden w-48 rotate-[16deg] lg:block"
            />
          </>
        )}
        <div className="relative z-10">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-black">
              Get more<br />productive team
            </h2>
          </Reveal>
          <div className="mt-8 flex justify-center">
            <Button variant="purpleSolid" icon>Start Now - Free</Button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium">
            {["Try FREE for 14 days", "No card required", "No switching banks"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <img src="/CheckCircle.svg" alt="" className="h-5 w-5" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}