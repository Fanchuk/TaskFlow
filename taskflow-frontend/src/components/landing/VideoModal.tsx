import Modal from '../ui/Modal';

export function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose}>
      <h3 className="text-2xl font-bold text-white">See TaskFlow in action</h3>
      <p className="mt-2 text-white/55">A 90-second tour of how teams plan and ship with TaskFlow.</p>
      <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
        <iframe
          className="h-full w-full"
          src="https://www.youtube.com/embed/qsN9phcEHmc"
          title="TaskFlow demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Modal>
  );
}