import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Upload, Trash2, UserPlus, RotateCcw, Pencil, FolderPlus } from "lucide-react";
import { filesService } from "../../services/files.service";

const ICONS: Record<string, any> = {
  uploaded: { icon: Upload, color: "text-green-400" },
  deleted: { icon: Trash2, color: "text-red-400" },
  restored: { icon: RotateCcw, color: "text-blue-400" },
  renamed: { icon: Pencil, color: "text-amber-400" },
  shared: { icon: UserPlus, color: "text-blue-400" },
};

function timeAgo(date: string) {
  const min = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function ActivityFeed() {
  const { data: activity = [] } = useQuery({ queryKey: ["activity"], queryFn: filesService.activity });

  if (activity.length === 0) return <p className="text-sm text-white/40">No activity yet</p>;

  return (
    <div className="space-y-1">
      {activity.map((a: any, i: number) => {
        const cfg = ICONS[a.action] || { icon: FolderPlus, color: "text-white/60" };
        const Icon = cfg.icon;
        return (
          <motion.div key={a.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
            className="flex items-center gap-3 rounded-lg py-2 hover:bg-white/5 px-2">
            <Icon className={`h-4 w-4 shrink-0 ${cfg.color}`} />
            <div className="flex-1 text-sm">
              <span className="text-white/80">{a.user.fullName}</span>{" "}
              <span className="text-white/50">{a.action}</span>{" "}
              <span className="text-blue-400">{a.fileName}</span>
            </div>
            <span className="text-xs text-white/40">{timeAgo(a.createdAt)}</span>
          </motion.div>
        );
      })}
    </div>
  );
}