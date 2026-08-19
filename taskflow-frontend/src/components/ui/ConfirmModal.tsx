import Modal from './Modal';
import { motion } from 'motion/react';

export default function ConfirmModal({
  open, onClose, onConfirm, title, message, confirmLabel = 'Confirm', danger = false,
}: {
  open: boolean; onClose: () => void; onConfirm: () => void;
  title: string; message: string; confirmLabel?: string; danger?: boolean;
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-white">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-white/60">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5">
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => { onConfirm(); onClose(); }}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-white ${danger ? 'bg-red-500 hover:bg-red-600' : 'bg-[#4f46e5] hover:bg-[#4338ca]'}`}
          >
            {confirmLabel}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}