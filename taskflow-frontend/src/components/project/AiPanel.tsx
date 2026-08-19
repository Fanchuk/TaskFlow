import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, FileText } from 'lucide-react';
import Modal from '../ui/Modal';
import { aiService } from '../../services/ai.service';
import Spinner from '../ui/Spinner';

export default function AiPanel({ title, desc }: { title: string; desc: string }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [summaryOpen, setSummaryOpen] = useState(false);

  const summary = useMutation({
    mutationFn: () => aiService.summarize(id!),
  });

  const openSummary = () => {
    setSummaryOpen(true);
    summary.mutate();
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/projects/${id}/ai-tasks`, { state: { title, desc } })}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] px-4 py-2.5 text-sm font-semibold"
        >
          <Sparkles className="h-4 w-4" /> Generate Tasks
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={openSummary}
          className="flex items-center gap-2 rounded-lg border border-[#4f46e5] px-4 py-2.5 text-sm font-semibold text-purple-300 hover:bg-[#4f46e5]/10"
        >
          <FileText className="h-4 w-4" /> AI Summary
        </motion.button>
      </div>

      <Modal open={summaryOpen} onClose={() => setSummaryOpen(false)}>
        <div className="text-white">
          <h3 className="flex items-center gap-2 text-xl font-bold">
            <Sparkles className="h-5 w-5 text-purple-400" /> Progress Summary
          </h3>
          <div className="mt-4 min-h-[100px]">
            {summary.isPending ? (
              <div className="flex justify-center py-8"><Spinner /></div>
            ) : (
              <p className="leading-relaxed text-white/80">{summary.data}</p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}