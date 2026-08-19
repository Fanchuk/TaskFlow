import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { ChevronLeft, Sparkles, Check, Plus } from 'lucide-react';
import { projectsService } from '../services/projects.service';
import { aiService } from '../services/ai.service';
import { tasksService } from '../services/tasks.service';
import Spinner from '../components/ui/Spinner';

export default function AiTasksPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const qc = useQueryClient();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [picked, setPicked] = useState<Set<string>>(new Set());

  const { data: project } = useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsService.getOne(id!),
    enabled: !!id,
  });

  const title = project?.title ?? state?.title ?? '';
  const desc = project?.desc ?? state?.desc ?? '';

  const generate = useMutation({
    mutationFn: () => aiService.generateTasks(title, desc),
    onSuccess: (tasks) => {
      setSuggestions(tasks);
      setPicked(new Set(tasks));
    },
  });

  const addTasks = useMutation({
    mutationFn: async () => {
      for (const title of picked) {
        await tasksService.create({ title, projectId: id!, status: 'todo' });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks', id] });
      toast.success(`Added ${picked.size} tasks`);
      navigate(`/projects/${id}/kanban`);
    },
  });

  const toggle = (t: string) => {
    setPicked((s) => {
      const next = new Set(s);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#111827] px-4 py-10 text-white">
      <div className="mx-auto max-w-2xl">
        <button onClick={() => navigate(`/projects/${id}/kanban`)}
          className="mb-6 flex items-center gap-2 text-white/70 hover:text-white">
          <ChevronLeft className="h-5 w-5" /> Back to board
        </button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-[#374151] bg-[#1f2937] p-8">
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <Sparkles className="h-6 w-6 text-purple-400" /> AI Task Generator
          </h1>
          <p className="mt-1 text-white/60">
            Generate tasks for <span className="font-semibold text-white">{title}</span> based on its description.
          </p>

          {suggestions.length === 0 && (
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => generate.mutate()}
              disabled={generate.isPending || (!project && !state)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] py-3 font-semibold disabled:opacity-60"
            >
              {generate.isPending
                ? <Spinner size={20} color="#fff" />
                : <><Sparkles className="h-4 w-4" /> Generate tasks</>}
            </motion.button>
          )}

          {suggestions.length > 0 && (
            <>
              <div className="mt-6 space-y-2">
                {suggestions.map((t, i) => (
                  <motion.button
                    key={t} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => toggle(t)}
                    className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                      picked.has(t) ? 'border-[#4f46e5] bg-[#4f46e5]/10' : 'border-[#374151] hover:bg-white/5'
                    }`}
                  >
                    <span className={`flex h-5 w-5 items-center justify-center rounded border ${
                      picked.has(t) ? 'border-[#4f46e5] bg-[#4f46e5]' : 'border-white/30'
                    }`}>
                      {picked.has(t) && <Check className="h-3 w-3" />}
                    </span>
                    <span className="text-sm">{t}</span>
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button onClick={() => generate.mutate()}
                  className="rounded-lg border border-[#374151] px-4 py-2.5 text-sm hover:bg-white/5">
                  Regenerate
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => addTasks.mutate()}
                  disabled={picked.size === 0 || addTasks.isPending}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#4f46e5] py-2.5 font-semibold hover:bg-[#4338ca] disabled:opacity-60"
                >
                  {addTasks.isPending
                    ? <Spinner size={18} color="#fff" />
                    : <><Plus className="h-4 w-4" /> Add {picked.size} tasks</>}
                </motion.button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}