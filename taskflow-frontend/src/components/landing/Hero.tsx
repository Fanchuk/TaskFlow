import { useState } from 'react';
import Button from '../ui/Button';
import { Reveal } from '../motion/Reveal';
import { DashboardMock } from '../motion/Decor';
import { VideoModal } from './VideoModal';
import { useCta } from '../../hooks/useCta';

const STATS = [
  { k: '12k+', v: 'Active teams' },
  { k: '99.9%', v: 'Uptime' },
  { k: '4.9', v: 'Avg rating' },
];

export default function Hero() {
  const { goStart } = useCta();
  const [demo, setDemo] = useState(false);

  return (
    <section className="relative mx-auto max-w-[1200px] px-4 pt-16 pb-24 md:pt-24 text-center">
      <Reveal>
        <span className="tf-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-white/80">
          <span className="h-2 w-2 rounded-full bg-[#22d3ee] shadow-[0_0_10px_#22d3ee] tf-glow" />
          New — real-time collaboration is live
        </span>
      </Reveal>

      <Reveal delay={0.05}>
        <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-[80px]">
          Manage your team,
          <br />
          <span className="tf-gradient-text">ship without chaos.</span>
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mx-auto mt-6 max-w-xl text-base text-white/60 md:text-lg">
          Plan projects, track progress, and deliver on time — all in one calm,
          fast workspace built for teams that move.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button variant="purpleSolid" icon onClick={goStart}>Try now — free</Button>
          <Button variant="purpleOutline" onClick={() => setDemo(true)}>Watch demo</Button>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
          {STATS.map((s) => (
            <div key={s.v} className="text-center">
              <div className="text-2xl font-bold tf-gradient-text md:text-3xl">{s.k}</div>
              <div className="text-xs text-white/45">{s.v}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.25}>
        <div className="relative mx-auto mt-16 max-w-[980px]">
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] [background:radial-gradient(ellipse_at_center,rgba(59,130,246,0.35),transparent_70%)] blur-2xl" />
          <DashboardMock />
        </div>
      </Reveal>

      <VideoModal open={demo} onClose={() => setDemo(false)} />
    </section>
  );
}