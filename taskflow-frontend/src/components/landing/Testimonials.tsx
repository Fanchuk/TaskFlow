import { motion } from 'motion/react';
import { container, scaleIn } from '../../hooks/useScrollReveal';

const REVIEWS = [
  { quote: 'TaskFlow is simply the best. It changed how our whole team ships.', name: 'Jillian Benbow', role: 'Community Manager', hue: '#22d3ee' },
  { quote: "Can't recommend TaskFlow enough — it just works.", name: 'Montes Kei', role: 'Developer at CBN', hue: '#3b82f6' },
  { quote: 'I love TaskFlow and use it daily. Never going back.', name: 'Enter JK', role: 'Software Eng. at Bom', hue: '#8b5cf6' },
  { quote: "You all did an amazing job. It's seriously saving me so much time — I can add notes and arrows to anything instantly.", name: 'Pillian Tom', role: 'Senior Manager', hue: '#ff6b35' },
  { quote: 'One of the nicest, most polished apps I use dozens of times a day. Worth every penny.', name: 'Jillian', role: 'Community Manager', hue: '#22d3ee' },
  { quote: 'When you capture a task it pops up and lets you save or share it instantly. Favorite piece of software.', name: 'Benbow', role: 'Senior Manager', hue: '#3b82f6' },
  { quote: 'TaskFlow is my favorite. Full stop.', name: 'Aria Cole', role: 'Community Manager', hue: '#8b5cf6' },
  { quote: "I'm so happy using the best task workspace ever. Great job, team. ✨", name: 'Lena Voss', role: 'Product Lead', hue: '#ff6b35' },
  { quote: 'It does anything and everything I need. 👌', name: 'Dan Iverson', role: 'Founder', hue: '#22d3ee' },
];

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('');
}

function Card({ quote, name, role, hue }: (typeof REVIEWS)[number]) {
  return (
    <motion.div
      variants={scaleIn}
      className="tf-card mb-6 break-inside-avoid p-6 md:p-7 transition-transform duration-200 hover:-translate-y-1.5"
    >
      <p className="text-[17px] leading-snug text-white/85">{quote}</p>
      <div className="mt-6 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full text-sm font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${hue}, #8b5cf6)` }}>
          {initials(name)}
        </span>
        <div>
          <p className="font-semibold text-white">{name}</p>
          <p className="text-sm text-white/45">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-[1300px] px-4 py-16 md:py-24">
      <p className="text-center text-sm uppercase tracking-[0.2em] text-[#8b5cf6]">Reviews</p>
      <h2 className="mt-3 text-center text-3xl md:text-[44px] font-bold">
        Loved by <span className="tf-gradient-text">product people</span>
      </h2>

      <motion.div
        className="mt-12 columns-1 gap-6 md:columns-2 lg:columns-3"
        initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={container}
      >
        {REVIEWS.map((r, i) => <Card key={i} {...r} />)}
      </motion.div>
    </section>
  );
}