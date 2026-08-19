import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";
import { MoreVertical, Trash2, UserPlus, Star, Eye } from "lucide-react";
import toast from "react-hot-toast";
import { AvatarStack } from "../ui/Avatar";
import { filesService, type FileItem } from "../../services/files.service";
import ShareModal from "./ShareModal";
import FilePreviewModal from "./FilePreviewModal";

function formatSize(bytes: number) {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + " MB";
  return (bytes / 1024 / 1024 / 1024).toFixed(1) + " GB";
}
function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function FileRow({ file, FileIcon }: { file: FileItem; FileIcon: any }) {
  const qc = useQueryClient();
  const [menu, setMenu] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const members = [file.owner, ...file.shares.map((s) => s.user)];

  const invalidate = () => {
    ["recent-files", "all-files", "folder-files", "storage", "starred"].forEach((k) =>
      qc.invalidateQueries({ queryKey: [k] })
    );
  };

  const del = useMutation({
    mutationFn: () => filesService.remove(file.id),
    onSuccess: () => { invalidate(); qc.invalidateQueries({ queryKey: ["trash"] }); toast.success("Moved to trash"); },
  });

  const star = useMutation({
    mutationFn: () => filesService.toggleStar(file.id),
    onSuccess: () => { invalidate(); toast.success(file.isStarred ? "Removed from starred" : "Starred"); },
  });

  return (
    <div className="relative grid grid-cols-2 items-center gap-4 py-3 md:grid-cols-[2fr_1fr_1.3fr_1fr_auto]">
      <button onClick={() => setPreviewOpen(true)} className="flex items-center gap-3 font-medium truncate text-left">
        <FileIcon className="h-8 w-8 shrink-0 rounded-lg bg-[#374151] p-1.5 text-blue-400" />
        <span className="truncate hover:text-blue-400 transition-colors">{file.name}</span>
        {file.isStarred && <Star className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" />}
      </button>
      <span className="hidden text-white/50 md:block">{formatSize(file.size)}</span>
      <span className="hidden text-white/50 md:block">{formatDate(file.createdAt)}</span>
      <button onClick={() => setShareOpen(true)} className="hidden md:block">
        <AvatarStack seeds={members.map((m) => m.fullName)} extra={0} size={26} />
      </button>

      <div className="flex items-center gap-1 ml-auto">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => star.mutate()}
          className="rounded p-1 hover:bg-white/10"
        >
          <Star className={`h-4 w-4 ${file.isStarred ? "fill-amber-400 text-amber-400" : "text-white/40"}`} />
        </motion.button>
        <div className="relative">
          <button onClick={() => setMenu((v) => !v)} className="rounded p-1 hover:bg-white/10">
            <MoreVertical className="h-5 w-5 text-white/40" />
          </button>
          <AnimatePresence>
            {menu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.12 }}
                className="absolute right-0 top-8 z-20 w-40 rounded-lg border border-[#374151] bg-[#1f2937] p-1 shadow-xl"
              >
                <button onClick={() => { setPreviewOpen(true); setMenu(false); }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-white/5">
                  <Eye className="h-4 w-4" /> Preview
                </button>
                <button onClick={() => { setShareOpen(true); setMenu(false); }} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-white/5">
                  <UserPlus className="h-4 w-4" /> Share
                </button>
                <button onClick={() => del.mutate()} disabled={del.isPending} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 disabled:opacity-50">
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ShareModal file={file} open={shareOpen} onClose={() => setShareOpen(false)} />
      <FilePreviewModal file={file} open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </div>
  );
}