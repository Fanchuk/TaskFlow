import { useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Spinner from '../ui/Spinner';

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      onClose();
      toast.success("Thanks! We'll get back to you shortly.");
    }, 800);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h3 className="text-2xl font-bold text-black">Contact sales</h3>
      <p className="mt-2 text-black/60">Tell us about your team and we'll reach out.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          required type="email" placeholder="Work email"
          className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#975bec] focus:ring-4 focus:ring-[#975bec]/20"
        />
        <textarea
          required rows={3} placeholder="How can we help?"
          className="w-full resize-none rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-[#975bec] focus:ring-4 focus:ring-[#975bec]/20"
        />
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="rounded-full px-5 py-2.5 font-semibold text-black/60 hover:bg-black/5">
            Cancel
          </button>
          <Button type="submit" variant="purpleSolid" disabled={sending}>
            {sending ? <Spinner /> : 'Send message'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}