import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, RotateCcw, Trash2, File as FileIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { filesService } from "../services/files.service";

export default function TrashPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: files = [] } = useQuery({ queryKey: ["trash"], queryFn: filesService.trash });

  const invalidate = () => ["trash", "recent-files", "storage", "folders"].forEach((k) => qc.invalidateQueries({ queryKey: [k] }));

  const restore = useMutation({ 
    mutationFn: (id: string) => filesService.restore(id), 
    onSuccess: () => { invalidate(); toast.success("Restored"); } 
  });

  const del = useMutation({ 
    mutationFn: (id: string) => filesService.permanentDelete(id), 
    onSuccess: () => { invalidate(); toast.success("Deleted forever"); } 
  });

  const empty = useMutation({ 
    mutationFn: () => filesService.emptyTrash(), 
    onSuccess: () => { invalidate(); toast.success("Trash emptied"); } 
  });

  return (
    <div className="p-6">
      <button onClick={() => navigate("/files")} className="mb-4 flex items-center gap-2 text-sm text-white/60 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to Files
      </button>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-[#1f2937] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-2xl font-bold"><Trash2 className="h-6 w-6" /> Trash ({files.length})</h3>
          {files.length > 0 && (
            <button onClick={() => empty.mutate()} className="text-sm font-medium text-red-400 hover:underline">Empty trash</button>
          )}
        </div>
        <div className="divide-y divide-[#374151]/50">
          <AnimatePresence>
            {files.map((f: any) => (
              <motion.div key={f.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}
                className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <FileIcon className="h-8 w-8 shrink-0 rounded-lg bg-[#374151] p-1.5 text-white/40" />
                  <div>
                    <p className="font-medium text-white/70">{f.name}</p>
                    <p className="text-xs text-white/40">Deleted {new Date(f.deletedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => restore.mutate(f.id)} className="flex items-center gap-1 rounded-lg bg-blue-500/10 px-3 py-1.5 text-sm text-blue-400 hover:bg-blue-500/20">
                    <RotateCcw className="h-3.5 w-3.5" /> Restore
                  </button>
                  <button onClick={() => del.mutate(f.id)} className="rounded-lg p-2 text-red-400 hover:bg-red-500/10">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {files.length === 0 && <p className="py-8 text-center text-sm text-white/40">Trash is empty</p>}
        </div>
      </motion.div>
    </div>
  );
}