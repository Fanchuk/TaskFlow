import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Plus, Link2, Folder, ImageIcon, FileText, Video, File as FileIcon, Star, BarChart3, Trash2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { filesService } from "../services/files.service";
import CreateFolderModal from "../components/files/CreateFolderModal";
import UploadModal from "../components/files/UploadModal";
import FileRow from "../components/files/FileRow";
import FileToolbar, { filterAndSort, type SortKey, type TypeFilter } from "../components/files/FileToolbar";
import ActivityFeed from "../components/files/ActivityFeed";

const FOLDER_COLORS: Record<string, { text: string; grad: string }> = {
  blue: { text: "text-blue-400", grad: "from-[#3b3aa0] to-[#1e1b4b]" },
  amber: { text: "text-amber-400", grad: "from-[#4338ca] to-[#312e81]" },
  green: { text: "text-green-400", grad: "from-[#3730a3] to-[#1e1b4b]" },
  orange: { text: "text-orange-400", grad: "from-[#4338ca] to-[#312e81]" },
};

const CATS = [
  { key: "image", label: "Images", icon: ImageIcon, color: "bg-blue-500" },
  { key: "video", label: "Media", icon: Video, color: "bg-amber-500" },
  { key: "document", label: "Documents", icon: FileText, color: "bg-red-500" },
  { key: "other", label: "Other", icon: FileIcon, color: "bg-blue-400" },
] as const;

function formatSize(bytes: number) {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + " MB";
  return (bytes / 1024 / 1024 / 1024).toFixed(1) + " GB";
}

export default function FilesPage() {
  const [folderModal, setFolderModal] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<TypeFilter>("all");
  const [sort, setSort] = useState<SortKey>("date");
  
  const navigate = useNavigate();

  const { data: folders = [] } = useQuery({ queryKey: ["folders"], queryFn: filesService.folders });
  const { data: recent = [] } = useQuery({
    queryKey: ["recent-files"],
    queryFn: () => filesService.recent(),
  });
  const { data: storage } = useQuery({ queryKey: ["storage"], queryFn: filesService.storage });

  const filtered = filterAndSort(recent, search, type, sort);

  const toGB = (bytes: number) => (bytes / 1024 / 1024 / 1024).toFixed(1);
  const usedPct = storage && storage.total ? Math.round((storage.used / storage.total) * 100) : 0;
  const donutData = [{ v: usedPct || 1, c: "#60a5fa" }, { v: 100 - (usedPct || 0), c: "#374151" }];
  const displayUsed = storage ? toGB(storage.used) : "0";
  const displayTotal = storage ? (storage.total / 1024 / 1024 / 1024).toFixed(0) : "512";
  const maxCat = storage ? Math.max(...CATS.map((c) => storage.byType[c.key] || 0), 1) : 1;

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Files Manager</h2>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/files/starred")} className="rounded-full border border-[#374151] p-2.5 hover:bg-white/5" title="Starred">
            <Star className="h-4 w-4 text-amber-400" />
          </button>
          <button onClick={() => navigate("/files/stats")} className="rounded-full border border-[#374151] p-2.5 hover:bg-white/5" title="Statistics">
            <BarChart3 className="h-4 w-4" />
          </button>
          <button onClick={() => navigate("/files/trash")} className="rounded-full border border-[#374151] p-2.5 hover:bg-white/5" title="Trash">
            <Trash2 className="h-4 w-4" />
          </button>
          <button onClick={() => setFolderModal(true)} className="flex items-center gap-2 rounded-full bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold hover:bg-[#4338ca]">
            <Plus className="h-4 w-4" /> Create New Folder
          </button>
          <button onClick={() => setUploadOpen(true)} className="flex items-center gap-2 rounded-full border border-[#374151] px-5 py-2.5 text-sm font-medium hover:bg-white/5">
            <Link2 className="h-4 w-4" /> Upload
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-[#1f2937] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">Folders</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {folders.map((f: any) => {
              const style = FOLDER_COLORS[f.color] || FOLDER_COLORS.blue;
              return (
                <motion.div
                  key={f.id}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/files/folder/${f.id}`)}
                  className={`cursor-pointer rounded-xl bg-gradient-to-br ${style.grad} p-4`}
                >
                  <Folder className={`h-8 w-8 ${style.text}`} fill="currentColor" />
                  <p className="mt-8 font-semibold">{f.name}</p>
                  <p className="text-sm text-white/50">{f.fileCount || 0} files</p>
                </motion.div>
              );
            })}
            {folders.length === 0 && <p className="text-sm text-white/40">No folders yet</p>}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl bg-[#1f2937] p-5">
          <div className="rounded-xl bg-gradient-to-br from-[#4f46e5] to-[#6366f1] p-5">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20">
                <ResponsiveContainer><PieChart><Pie data={donutData} dataKey="v" innerRadius={26} outerRadius={36} startAngle={90} endAngle={-270} stroke="none">{donutData.map((d, i) => <Cell key={i} fill={d.c} />)}</Pie></PieChart></ResponsiveContainer>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">{usedPct}%</span>
              </div>
              <div><p className="font-semibold">Available Storage</p><p className="text-sm text-white/70">{displayUsed}GB / {displayTotal}GB</p></div>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            {CATS.map((c) => {
              const bytes = storage?.byType[c.key] || 0;
              const pct = Math.round((bytes / maxCat) * 100);
              return (
                <div key={c.key} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#374151]"><c.icon className="h-4 w-4 text-white/70" /></span>
                  <div className="flex-1">
                    <div className="mb-1 flex justify-between text-sm"><span className="text-white/50">{c.label}</span><span>{formatSize(bytes)}</span></div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#374151]"><div className={`h-full rounded-full ${c.color}`} style={{ width: `${pct}%` }} /></div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-[#1f2937] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-2xl font-bold">Recent Files</h3>
            <button onClick={() => navigate("/files/all")} className="text-sm font-medium text-blue-400 hover:underline">View All</button>
          </div>
          <FileToolbar search={search} setSearch={setSearch} type={type} setType={setType} sort={sort} setSort={setSort} />
          <div className="hidden grid-cols-[2fr_1fr_1.3fr_1fr_auto] gap-4 border-b border-[#374151] pb-3 text-sm text-white/50 md:grid">
            <span>Name</span><span>Size</span><span>Last Modified</span><span>Members</span><span />
          </div>
          <div className="divide-y divide-[#374151]/50">
            {filtered.map((f: any) => <FileRow key={f.id} file={f} FileIcon={FileIcon} />)}
            {filtered.length === 0 && <p className="py-8 text-center text-sm text-white/40">No files found</p>}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl bg-[#1f2937] p-6">
          <h3 className="mb-4 text-2xl font-bold">Recent Activity</h3>
          <ActivityFeed />
        </motion.div>
      </div>
      <CreateFolderModal open={folderModal} onClose={() => setFolderModal(false)} />
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </div>
  );
}