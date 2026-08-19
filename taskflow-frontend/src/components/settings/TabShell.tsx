import { motion } from 'motion/react';
import { Save } from 'lucide-react';
import Spinner from '../ui/Spinner';

export default function TabShell({
  title, children, onSave, saving, showFooter = true,
}: {
  title: string; children: React.ReactNode;
  onSave?: () => void; saving?: boolean; showFooter?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-xl bg-[#1f2937]"
    >
      <div className="p-6 md:p-8">
        <h2 className="mb-6 text-xl font-bold">{title}</h2>
        {children}
      </div>
      {showFooter && (
        <div className="flex justify-end gap-3 border-t border-[#374151] bg-[#1a2230] px-6 py-4 md:px-8">
          <button className="rounded-lg px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5">Cancel</button>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={onSave} disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-4 py-2.5 text-sm font-semibold hover:bg-[#4338ca] disabled:opacity-60"
          >
            {saving ? <Spinner /> : <><Save className="h-4 w-4" /> Save Changes</>}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}