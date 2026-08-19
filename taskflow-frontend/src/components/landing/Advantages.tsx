import Button from "../ui/Button";
import { motion } from 'motion/react';
import { fadeUp } from '../../hooks/useScrollReveal';

function AdvCard({ children, bg, className = "" }: { children: React.ReactNode; bg: string; className?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      className={`relative overflow-hidden rounded-[27px] ${bg} ${className}`}
    >
      <div className="grid gap-8 p-8 md:grid-cols-2 md:items-center md:p-12">{children}</div>
    </motion.div>
  );
}

const CheckPill = ({ children, icon }: { children: React.ReactNode; icon: string }) => (
  <motion.div
    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.12)' }}
    transition={{ duration: 0.2 }}
    className="inline-flex items-center gap-3 rounded-2xl border border-white/25 px-4 py-2.5"
  >
    <img src={icon} alt="" className="h-6 w-6" />
    <span className="font-semibold">{children}</span>
  </motion.div>
);

export default function Advantages() {
  return (
    <section className="mx-auto max-w-[1447px] px-4 py-16 md:py-24">
      <img src="/Frame 221.svg" alt="Advantages" className="mx-auto mb-4 h-6 w-auto" />
      <h2 className="text-center text-3xl md:text-[44px] font-extrabold leading-tight text-black">
        A task manager you can<br />trust for teams
      </h2>
      <p className="mt-4 text-center text-black/70">
        Plan projects, stay on track, and deliver on time without overworking your team.
      </p>
      <div className="mt-8 flex justify-center">
        <Button variant="purpleSolid" icon>Get Start</Button>
      </div>

      <div className="mt-14 space-y-8">
        <AdvCard bg="bg-[#f0562e]" className="text-white">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-6 w-6 shrink-0 rounded-full border-[3px] border-white" />
              <h3 className="text-3xl font-extrabold leading-tight md:text-[40px]">Simple to use,<br />powerful when need.</h3>
            </div>
            <p className="mt-5 border-l-2 border-white/40 pl-4 text-white/90 md:max-w-md">
              Create tasks and projects, upload files, and add comments. With Teamwork everything is in one central location.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CheckPill icon="/Frame (3).svg">Costumized your workflow.</CheckPill>
              <CheckPill icon="/Group 7.svg">Extra features for complex projects.</CheckPill>
            </div>
          </div>
          <div className="relative min-h-[280px]">
            <motion.img
              whileHover={{ scale: 1.03, rotate: 0 }}
              transition={{ duration: 0.4 }}
              src="/Frame 6012.jpg" alt=""
              className="absolute left-2 top-2 w-[95%] rounded-[14px] shadow-2xl md:left-4"
            />
          </div>
        </AdvCard>

        <AdvCard bg="bg-[#1e4620]" className="text-white">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-6 w-6 shrink-0 rounded-full border-[3px] border-white" />
              <h3 className="text-3xl font-extrabold leading-tight md:text-[40px]">Take complex<br />projects with ease</h3>
            </div>
            <p className="mt-5 border-l-2 border-white/40 pl-4 text-white/90 md:max-w-md">
              Use status features updates to see how your project is progressing and what's left to do.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CheckPill icon="/Frame (2).svg">Keep everyone accountable.</CheckPill>
              <CheckPill icon="/Frame (8).svg">Make sure your status.</CheckPill>
            </div>
          </div>
          <div className="relative min-h-[300px]">
            <motion.img
              whileHover={{ scale: 1.03, rotate: 0 }}
              transition={{ duration: 0.4 }}
              src="/Frame 238.jpg" alt=""
              className="w-full rounded-[14px] shadow-2xl"
            />
          </div>
        </AdvCard>

        <AdvCard bg="bg-[#8b5cf6]" className="text-white">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-6 w-6 shrink-0 rounded-full border-[3px] border-white" />
              <h3 className="text-3xl font-extrabold leading-tight md:text-[40px]">Create calm with<br />integrations.</h3>
            </div>
            <p className="mt-5 border-l-2 border-white/40 pl-4 text-white/90 md:max-w-md">
              Connect Fintask with all the favorite tools you've already use.
            </p>
            <div className="mt-8">
              <Button variant="orangeOutline" icon>Explore integrations</Button>
            </div>
          </div>
          <div className="relative min-h-[300px]">
            <motion.img
              whileHover={{ scale: 1.03, rotate: 0 }}
              transition={{ duration: 0.4 }}
              src="/Frame 6021.jpg" alt=""
              className="w-full rounded-[14px] shadow-2xl"
            />
          </div>
        </AdvCard>
      </div>
    </section>
  );
}