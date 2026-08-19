import { motion } from 'motion/react';
import { container, scaleIn } from '../../hooks/useScrollReveal';

const FEATURES = [
  {
    title: "Task Prograss",
    desc: "Send scheduling links guests love",
    img: "/Frame 210.png",
    bg: "bg-[#fffde7]",
    back: "bg-[#fffde7]",
    rotate: "-rotate-[4deg]"
  },
  {
    title: "Plan Calendar",
    desc: "Send scheduling links guests love",
    img: "/Frame 209.png",
    bg: "bg-[#f4effd]",
    back: "bg-black",
    rotate: "rotate-[5deg]"
  },
  {
    title: "Collaborations",
    desc: "Send scheduling links guests love",
    img: "/Frame 211.png",
    bg: "bg-[#ebf5ff]",
    back: "bg-[#ebf5ff]",
    rotate: "-rotate-[4deg]"
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-16 md:py-24">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={container}>
        <motion.img variants={scaleIn} src="/Group 221.svg" alt="Features" className="mx-auto mb-4 h-6 w-auto" />
        <motion.h2 variants={scaleIn} className="text-center text-3xl md:text-[44px] font-extrabold leading-tight text-black">
          The features<br />Both familiar and new.
        </motion.h2>
      </motion.div>

      <motion.div
        className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-6 lg:gap-8"
        initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={container}>
        {FEATURES.map((f) => (
          <motion.div
            key={f.title}
            variants={scaleIn}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="relative mx-auto w-full max-w-[420px] md:max-w-none"
          >
            <div className={`absolute inset-0 rounded-[36px] ${f.back} ${f.rotate} opacity-90`} aria-hidden />
            <div className={`relative flex h-full flex-col overflow-hidden rounded-[36px] ${f.bg} px-7 pt-9 pb-0 md:px-8 md:pt-10`}>
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-[3px] border-[#e8582c]" />
                <h3 className="text-[26px] font-extrabold leading-tight text-black md:text-[28px]">{f.title}</h3>
              </div>
              <p className="mt-3 text-[17px] font-medium leading-relaxed text-black/70">{f.desc}</p>
              <div className="mt-8 flex-1">
                <img src={f.img} alt={f.title} className="w-full object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.05)]" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}