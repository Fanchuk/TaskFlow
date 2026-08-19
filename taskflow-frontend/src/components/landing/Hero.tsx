import Button from "../ui/Button";
import { Reveal } from '../motion/Reveal';
import { useCta } from '../../hooks/useCta';
import { motion } from 'motion/react';

export default function Hero() {
  const { goStart } = useCta();

  return (
    <section className="relative w-full overflow-x-clip pt-12 pb-24 md:pt-20">
      <motion.div
        animate={{ y: [0, -18, 0], rotate: [11, 13, 11] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-4 top-72 hidden w-[230px] lg:block xl:w-[290px]"
      >
        <img src="/Frame 80 (1).png" alt="" className="w-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.10)]" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -22, 0], rotate: [-15, -13, -15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-4 top-56 hidden w-[190px] lg:block xl:w-[230px]"
      >
        <img src="/Frame 78 (1).png" alt="" className="w-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.10)]" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 font-sans text-4xl font-bold leading-[1.1] tracking-tight text-black sm:text-6xl md:text-[81px] min-w-0">
              <span>Manage Your</span>
              <img src="/Group 201.png" alt="team" className="inline-block h-12 w-auto md:h-16" />
              <span>Team's</span>
            </h1>
            <div className="mt-8 flex justify-center">
              <motion.img
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                src="/Group 200 (1).png" alt="Productivity"
                className="h-[90px] w-auto md:h-[130px] object-contain"
              />
            </div>
            <p className="mx-auto mt-8 max-w-lg text-base font-medium text-black/75 md:text-lg">
              Plan projects, stay on track, and deliver on time without overworking your team.
            </p>
            <div className="mt-8 flex justify-center">
              <Button variant="purpleSolid" icon onClick={goStart}>Try Now - Free!</Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-black/80">
              <img src="/Frame 214.svg" alt="" className="h-5 w-5" />
              <span className="text-[15px]">Excellent 4.9 out of 5</span>
              <img src="/image 66.svg" alt="sitejabber" className="h-5 w-auto" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="relative z-10 mx-auto mt-16 max-w-[1257px] md:mt-28">
            <div className="absolute -bottom-8 -left-4 -right-6 top-8 -rotate-[4deg] rounded-[32px] bg-[#7562f3] md:-bottom-16 md:-left-8 md:-right-12 md:top-12 md:rounded-[48px]" aria-hidden />
            <img src="/Container.jpg" alt="TaskFlow dashboard" className="relative w-full rounded-[20px] object-cover shadow-[0_20px_50px_rgba(0,0,0,0.10)] md:rounded-[24px]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}