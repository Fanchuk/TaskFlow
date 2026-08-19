import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";
import { filesService } from "../services/files.service";

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1024 / 1024).toFixed(1) + " MB";
}

export default function FileStatsPage() {
  const navigate = useNavigate();
  const { data: stats } = useQuery({ queryKey: ["file-stats"], queryFn: filesService.stats });

  const chartData = stats
    ? Object.entries(stats.byMonth).map(([month, count]) => ({ month: month.slice(5), count })).slice(-6)
    : [];

  const cards = [
    { label: "Total files", value: stats?.totalFiles ?? 0 },
    { label: "Folders", value: stats?.folders ?? 0 },
    { label: "Shared", value: stats?.shared ?? 0 },
    { label: "Used", value: stats ? formatSize(stats.used) : "0 B" },
  ];

  return (
    <div className="p-6">
      <button onClick={() => navigate("/files")} className="mb-4 flex items-center gap-2 text-sm text-white/60 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Back to Files
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="rounded-2xl bg-[#1f2937] p-5">
            <p className="text-sm text-white/50">{c.label}</p>
            <p className="mt-1 text-3xl font-bold">{c.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl bg-[#1f2937] p-6">
        <h3 className="mb-6 text-xl font-bold">Uploads by month</h3>
        <div className="h-[240px] w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {chartData.map((_, i) => <Cell key={i} fill="#4f46e5" />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-white/40">No data yet</div>
          )}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-[#1f2937] p-6">
          <h3 className="mb-4 text-xl font-bold">Files by type</h3>
          <div className="space-y-3">
            {stats && [
              { label: "Images", val: stats.byType.image, color: "bg-blue-500" },
              { label: "Media", val: stats.byType.video, color: "bg-amber-500" },
              { label: "Documents", val: stats.byType.document, color: "bg-red-500" },
              { label: "Other", val: stats.byType.other, color: "bg-purple-500" },
            ].map((t) => {
              const max = Math.max(stats.byType.image, stats.byType.video, stats.byType.document, stats.byType.other, 1);
              return (
                <div key={t.label}>
                  <div className="mb-1 flex justify-between text-sm"><span className="text-white/60">{t.label}</span><span>{t.val}</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#374151]">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${(t.val / max) * 100}%` }} transition={{ duration: 0.5 }} className={`h-full rounded-full ${t.color}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-[#1f2937] p-6">
          <h3 className="mb-4 text-xl font-bold">Largest files</h3>
          <div className="space-y-2">
            {stats?.topFiles.map((f, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-[#111827] px-3 py-2">
                <span className="truncate text-sm">{f.name}</span>
                <span className="shrink-0 text-sm text-white/50">{formatSize(f.size)}</span>
              </div>
            ))}
            {(!stats || stats.topFiles.length === 0) && <p className="text-sm text-white/40">No files yet</p>}
          </div>
        </div>
      </motion.div>
    </div>
  );
}