import { motion } from 'motion/react';
import { container, fadeUp } from '../../hooks/useScrollReveal';

const LOGOS = [
  { name: "Notion", src: "/Group 232.svg" },
  { name: "Calendar", src: "/Group 233.svg" },
  { name: "Trello", src: "/trello-logo 1.svg" },
  { name: "Slack", src: "/Group 230.svg" },
  { name: "Outlook", src: "/Group 231.svg" },
];

export default function Integrations() {
  return (
    <section className="mx-auto max-w-[1322px] px-4 py-12 md:py-16">
      <p className="text-center text-black/50 mb-8">
        Our native plants are listed below integrations
      </p>
      <motion.div
        className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={container}
      >
        {LOGOS.map((l) => (
          <motion.img
            key={l.name}
            variants={fadeUp}
            whileHover={{ scale: 1.1, opacity: 1 }}
            src={l.src}
            alt={l.name}
            className="h-6 md:h-7 w-auto object-contain opacity-70 grayscale transition hover:grayscale-0"
          />
        ))}
      </motion.div>
    </section>
  );
}