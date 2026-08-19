import { useState } from "react";
import { motion } from "motion/react";
import {
  Bell, HelpCircle, Moon, Menu, ChevronLeft, LayoutDashboard, List, Plus,
  Calendar, CheckSquare,
} from "lucide-react";
import ProjectSidebar from "./ProjectSidebar";
import Avatar from "../ui/Avatar";

type KanbanTask = { title: string; priority: string; pColor: string; date: string; sub?: string };
type KanbanColumn = { key: string; label: string; dot: string; tasks: KanbanTask[] };

const COLUMNS: KanbanColumn[] = [
  {
    key: "todo", label: "To Do", dot: "bg-amber-400",
    tasks: [{ title: "Content migration", priority: "Low", pColor: "bg-green-900/50 text-green-400", date: "10/25/2023" }],
  },
  {
    key: "progress", label: "In Progress", dot: "bg-blue-500",
    tasks: [{ title: "Implement responsive layout", priority: "Medium", pColor: "bg-amber-900/50 text-amber-400", date: "10/18/2023", sub: "1/3" }],
  },
  {
    key: "done", label: "Done", dot: "bg-green-500",
    tasks: [{ title: "Design homepage mockup", priority: "High", pColor: "bg-red-900/50 text-red-400", date: "10/15/2023", sub: "3/3" }],
  },
];

const TEAM = [
  { name: "Alex Morgan", role: "Admin", status: "online" },
  { name: "Jamie Chen", role: "Member", status: "online" },
  { name: "Taylor Swift", role: "Member", status: "offline" },
];

export default function KanbanPage() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"kanban" | "list">("kanban");

  return (
    <div className="flex h-screen overflow-hidden bg-[#111827] text-white">
      <ProjectSidebar open={open} onClose={() => setOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-[#374151] px-6 py-5">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setOpen(true)}><Menu className="h-6 w-6" /></button>
            <h1 className="text-xl font-bold md:text-2xl">Hi , Mostafa</h1>
          </div>
          <div className="flex items-center gap-4 text-white/80">
            <motion.div whileHover={{ scale: 1.15 }}><Bell className="h-5 w-5 cursor-pointer" /></motion.div>
            <motion.div whileHover={{ scale: 1.15 }}><HelpCircle className="h-5 w-5 cursor-pointer" /></motion.div>
            <div className="relative">
              <Avatar seed="Mostafa Mahmoud" size={36} />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#111827] bg-green-400" />
            </div>
            <motion.div whileHover={{ rotate: -20 }}><Moon className="h-5 w-5 cursor-pointer" /></motion.div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-6 md:px-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <ChevronLeft className="h-6 w-6 text-white/60" />
                <h2 className="text-2xl font-bold md:text-3xl">Website Redesign</h2>
                <span className="h-3 w-3 rounded-full bg-[#4f46e5]" />
              </div>
              <p className="mt-1 pl-9 text-white/60">Redesign company website with new branding</p>
            </div>

            <div className="flex items-center gap-3 pl-9 lg:pl-0">
              <div className="flex items-center rounded-lg bg-[#1f2937] p-1">
                <button onClick={() => setView("kanban")}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${view === "kanban" ? "bg-[#4f46e5] text-white" : "text-white/60"}`}>
                  <LayoutDashboard className="h-4 w-4" /> Kanban
                </button>
                <button onClick={() => setView("list")}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${view === "list" ? "bg-[#4f46e5] text-white" : "text-white/60"}`}>
                  <List className="h-4 w-4" /> List
                </button>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-4 py-2.5 text-sm font-semibold hover:bg-[#4338ca]">
                <Plus className="h-4 w-4" /> Add Task
              </motion.button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-6 rounded-xl bg-[#1f2937] p-5">
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#374151]">
              <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className="h-full rounded-full bg-[#4f46e5]" />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-white/60">
              <span>Progress</span><span>65% complete</span>
            </div>
          </motion.div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
            <div className="grid gap-4 md:grid-cols-3">
              {COLUMNS.map((col, ci) => (
                <motion.div key={col.key}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + ci * 0.1 }}
                  className="rounded-xl bg-[#1f2937]/60 p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-semibold">
                      <span className={`h-2.5 w-2.5 rounded-full ${col.dot}`} />
                      {col.label} <span className="text-white/40">({col.tasks.length})</span>
                    </span>
                    <Plus className="h-5 w-5 cursor-pointer text-white/40 hover:text-white" />
                  </div>
                  <div className="mt-4 space-y-3">
                    {col.tasks.map((t) => (
                      <motion.div key={t.title}
                        whileHover={{ y: -4, scale: 1.02, boxShadow: "0 12px 30px rgba(0,0,0,0.25)" }}
                        className="cursor-grab rounded-xl border border-[#374151] bg-[#1f2937] p-4 active:cursor-grabbing">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="font-semibold">{t.title}</h4>
                          <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${t.pColor}`}>{t.priority}</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm text-white/50">
                          <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{t.date}</span>
                          {t.sub && <span className="flex items-center gap-1.5"><CheckSquare className="h-4 w-4" />{t.sub}</span>}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="h-fit rounded-xl bg-[#1f2937] p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold">Team Members</h3>
                <button className="text-sm font-medium text-purple-400 hover:text-purple-300">+ Add</button>
              </div>
              <div className="mt-5 space-y-4">
                {TEAM.map((m, i) => (
                  <motion.div key={m.name}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.08 }}
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar seed={m.name} size={40} />
                      <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#1f2937] ${m.status === "online" ? "bg-green-400" : "bg-gray-500"}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{m.name}</p>
                      <p className="text-sm text-white/50">{m.role}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs ${m.status === "online" ? "bg-green-900/40 text-green-400" : "bg-gray-700/50 text-gray-400"}`}>
                      {m.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}