import { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);

  const inputCls =
    'w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder-white/35 outline-none focus:border-[#3b82f6]/60 focus:ring-4 focus:ring-[#3b82f6]/20 transition';

  return (
    <Modal open={open} onClose={() => { setSent(false); onClose(); }}>
      {sent ? (
        <div className="text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl [background:linear-gradient(135deg,#22d3ee,#3b82f6)]">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="mt-5 text-2xl font-bold text-white">Thanks — we'll be in touch</h3>
          <p className="mt-2 text-white/55">Our team will reach out within one business day.</p>
          <Button variant="purpleSolid" className="mt-6 w-full" onClick={() => { setSent(false); onClose(); }}>Done</Button>
        </div>
      ) : (
        <>
          <h3 className="text-2xl font-bold text-white">Talk to sales</h3>
          <p className="mt-2 text-white/55">Tell us about your team and we'll tailor a plan.</p>
          <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input required placeholder="Work email" type="email" className={inputCls} />
            <input required placeholder="Company" className={inputCls} />
            <textarea placeholder="What are you looking for?" rows={3} className={inputCls} />
            <Button type="submit" variant="purpleSolid" className="w-full">Send message</Button>
          </form>
        </>
      )}
    </Modal>
  );
}