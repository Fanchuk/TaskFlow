import Button from "../ui/Button";
import { motion } from 'motion/react';
import { container, scaleIn } from '../../hooks/useScrollReveal';

const REVIEWS = [
  { quote: '"Fintask The best!"', name: "Jillian Benbow", role: "Senior Community Manager", img: "/Frame 5625.png" },
  { quote: '"Can\'t recommend Fintask enough 👌"', name: "Montes Kei", role: "Developer at CBN", img: "/Frame 5625 (1).png" },
  { quote: '"I love Fintask! Use it daily too."', name: "Enters JK", role: "Software Eng. at Bom", img: "/Frame 5625 (2).png" },
  { quote: "\"Hey Fintask you all did an amazing job. It's seriously saving me so much time. Screenshots don't disappear right away, I can draw & add arrows to screenshots instantly\"", name: "Pilliaf Tom", role: "Senior Manager", img: "/Frame 5625.png" },
  { quote: '"Fintask One of the nicest, most wonderful, amazing, perfect Mac apps I use fifty+ times a day. Worth every penny."', name: "Jillian", role: "Community Manager", img: "/Frame 5625 (1).png" },
  { quote: '"Have you used Fintask before? When you take a screenshot, it pops up and lets you save it or copy it. Probably one of my favorite pieces of Mac software"', name: "Benbow", role: "Senior Manager", img: "/Frame 5625 (2).png" },
  { quote: "Fintask is my favourite", name: "Jillian Benbow", role: "Senior Community Manager", img: "/Frame 5625.png" },
  { quote: "I'm so happy using the best screenshot/video recording app ever – Webuir. Great job guys. ✨", name: "Jillian Benbow", role: "Senior Community Manager", img: "/Frame 5625 (1).png" },
  { quote: "Fintask does anything and everything I need. 👌", name: "Jillian Benbow", role: "Senior Community Manager", img: "/Frame 5625 (2).png" },
];

function Card({ quote, name, role, img }: { quote: string; name: string; role: string; img: string }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="mb-6 break-inside-avoid rounded-[14px] border border-[#e0e0e0] bg-white p-6 md:px-8 md:py-7"
    >
      <p className="text-[19px] font-medium leading-snug text-black">{quote}</p>
      <div className="mt-6 flex items-center gap-3">
        <img src={img} alt={name} className="h-11 w-11 rounded-full object-cover" />
        <div>
          <p className="font-bold text-black">{name}</p>
          <p className="text-sm text-black/60">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-[1626px] px-4 py-16 md:py-24">
      <img src="/Frame 6028 (1).svg" alt="Reviews" className="mx-auto mb-4 h-6 w-auto" />
      <h2 className="text-center text-3xl md:text-[44px] font-extrabold text-black">
        Loved by product people
      </h2>

      <div
        className="relative mt-14 max-h-[760px] overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
        }}
      >
        <motion.div
          className="columns-1 gap-6 md:columns-2 lg:columns-3"
          initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={container}
        >
          {REVIEWS.map((r, i) => <Card key={i} {...r} />)}
        </motion.div>
      </div>

      <div className="-mt-8 flex justify-center">
        <Button variant="purpleOutline" icon>See more</Button>
      </div>
    </section>
  );
}