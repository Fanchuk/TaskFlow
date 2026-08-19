import { useState } from 'react';
import { motion } from 'motion/react';
import CTA from "../components/landing/CTA";
import { detectOS } from '../hooks/useOS';
import { DownloadModal } from '../components/landing/DownloadModal';
import { Reveal } from '../components/motion/Reveal';

export default function Download() {
  const os = detectOS();
  const [dl, setDl] = useState<null | 'windows' | 'mac'>(null);

  return (
    <>
      <section className="mx-auto max-w-[1322px] overflow-x-clip px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
          <Reveal className="relative z-10">
            <motion.img
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src="/Frame 6109.png"
              alt="Download"
              className="mb-6 h-6 w-auto"
            />
            <h1 className="font-serif text-3xl font-bold leading-tight text-black sm:text-4xl md:text-[52px]">
              Task Flow for Your<br />Desktop.
            </h1>
            <p className="mt-5 max-w-md text-base text-black/70 md:mt-6 md:text-lg">
              An all-in-one task management that works on your desktop and in your browser.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 md:mt-8">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                onClick={() => setDl('windows')}
                className="relative inline-flex items-center justify-center gap-3 rounded-xl bg-[#975bec] px-7 py-4 font-semibold text-white outline-none transition-colors hover:bg-[#8548d8] focus-visible:ring-4 focus-visible:ring-[#975bec]/40"
              >
                <img src="/WindowsLogo.svg" alt="" className="h-6 w-6" />
                Windows
                {os === 'windows' && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-2 -top-2 rounded-full bg-[#f0562e] px-2 py-0.5 text-xs text-white"
                  >
                    You
                  </motion.span>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                onClick={() => setDl('mac')}
                className="relative inline-flex items-center justify-center gap-3 rounded-xl border-2 border-black bg-white px-7 py-4 font-semibold text-black outline-none transition-colors hover:bg-black/5 focus-visible:ring-4 focus-visible:ring-black/20"
              >
                <img src="/AppleLogo.svg" alt="" className="h-6 w-6" />
                MacOS
                {os === 'mac' && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-2 -top-2 rounded-full bg-[#f0562e] px-2 py-0.5 text-xs text-white"
                  >
                    You
                  </motion.span>
                )}
              </motion.button>
            </div>

            <p className="mt-6 text-sm text-black/50">
              Windows 10 or later &nbsp;•&nbsp; Mac with Apple M1
            </p>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full lg:-mr-14 lg:w-[115%] lg:max-w-none"
          >
            <div
              className="pointer-events-none absolute inset-0 hidden rounded-[89px] border-[2px] border-black lg:block"
              style={{
                maskImage: 'linear-gradient(to right, black 0%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 100%)',
              }}
            />
            <div className="p-0 sm:p-4 md:p-8 lg:p-14">
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                src="/Container (1).jpg"
                alt="TaskFlow files dashboard"
                className="w-full rounded-[16px] object-cover shadow-[0_20px_50px_rgba(0,0,0,0.15)] md:rounded-[24px]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <CTA decor={false} />

      {dl && <DownloadModal open onClose={() => setDl(null)} os={dl} />}
    </>
  );
}