import { useNavigate } from 'react-router-dom';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export function DownloadModal({
  open, onClose, os,
}: {
  open: boolean; onClose: () => void; os: 'windows' | 'mac';
}) {
  const navigate = useNavigate();
  const label = os === 'windows' ? 'Windows' : 'macOS';

  return (
    <Modal open={open} onClose={onClose}>
      <h3 className="text-2xl font-bold text-white">Download for {label}</h3>
      <p className="mt-2 text-white/55">
        The desktop app isn't ready yet — but you can use TaskFlow right in your browser.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <Button variant="purpleSolid" onClick={() => { onClose(); navigate('/register'); }} className="w-full">
          Open web version
        </Button>
        <button onClick={onClose} className="rounded-full px-5 py-2.5 font-semibold text-white/50 hover:bg-white/5 transition">
          Maybe later
        </button>
      </div>
    </Modal>
  );
}