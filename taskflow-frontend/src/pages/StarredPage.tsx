import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { ArrowLeft, Star, File as FileIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FileRow from "../components/files/FileRow";
import { filesService } from "../services/files.service";

export default function StarredPage() {
  const navigate = useNavigate();
  const { data: files = [] } = useQuery({ queryKey: ["starred"], queryFn: filesService.starred });

  return (
    <div className="p-6">
      <button onClick={() => navigate("/files")} className="mb-4 flex items-center gap-2 text-sm text-white/60 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to Files
      </button>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-[#1f2937] p-6">
        <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold"><Star className="h-6 w-6 fill-amber-400 text-amber-400" /> Starred ({files.length})</h3>
        <div className="hidden grid-cols-[2fr_1fr_1.3fr_1fr_auto] gap-4 border-b border-[#374151] pb-3 text-sm text-white/50 md:grid">
          <span>Name</span><span>Size</span><span>Last Modified</span><span>Members</span><span />
        </div>
        <div className="divide-y divide-[#374151]/50">
          {files.map((f: any) => <FileRow key={f.id} file={f} FileIcon={FileIcon} />)}
          {files.length === 0 && <p className="py-8 text-center text-sm text-white/40">No starred files yet</p>}
        </div>
      </motion.div>
    </div>
  );
}