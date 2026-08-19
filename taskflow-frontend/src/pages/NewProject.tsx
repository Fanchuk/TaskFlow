import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { ChevronLeft } from 'lucide-react';
import { projectsService } from '../services/projects.service';
import Spinner from '../components/ui/Spinner';

const schema = z.object({
  title: z.string().min(2, 'Enter a project name'),
  desc: z.string().min(1, 'Add a short description'),
  color: z.string(),
});
type FormData = z.infer<typeof schema>;

const COLORS = [
  { key: 'indigo', cls: 'bg-[#4f46e5]' },
  { key: 'purple', cls: 'bg-purple-500' },
  { key: 'pink', cls: 'bg-pink-500' },
  { key: 'green', cls: 'bg-green-500' },
  { key: 'amber', cls: 'bg-amber-500' },
];

export default function NewProject() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { register, handleSubmit, watch, setValue, formState: { errors } } =
    useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { color: 'indigo' } });

  const color = watch('color');

  // мутація створення + оновлення кешу проєктів
  const { mutate, isPending } = useMutation({
    mutationFn: projectsService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects'] }); // дашборд перезавантажить список
      toast.success('Project created');
      navigate('/dashboard');
    },
    onError: () => toast.error('Could not create project'),
  });

  return (
    <div className="min-h-screen bg-[#111827] px-4 py-10 text-white">
      <div className="mx-auto max-w-2xl">
        <button onClick={() => navigate('/dashboard')} className="mb-6 flex items-center gap-2 text-white/70 hover:text-white">
          <ChevronLeft className="h-5 w-5" /> Back to dashboard
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-[#374151] bg-[#1f2937] p-8"
        >
          <h1 className="text-2xl font-bold">New Project</h1>
          <p className="mt-1 text-white/60">Set up a project and start adding tasks.</p>

          <form onSubmit={handleSubmit((d) => mutate(d))} className="mt-8 space-y-6">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">Project name</label>
              <input
                {...register('title')} placeholder="Website Redesign"
                className="w-full rounded-lg border border-[#4b5563] bg-[#374151] px-4 py-3 outline-none focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/20 transition"
              />
              {errors.title && <p className="mt-1.5 text-sm text-red-400">{errors.title.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-white/80">Description</label>
              <textarea
                {...register('desc')} rows={3} placeholder="What is this project about?"
                className="w-full resize-none rounded-lg border border-[#4b5563] bg-[#374151] px-4 py-3 outline-none focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/20 transition"
              />
              {errors.desc && <p className="mt-1.5 text-sm text-red-400">{errors.desc.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">Color</label>
              <div className="flex gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c.key} type="button"
                    onClick={() => setValue('color', c.key)}
                    className={`h-9 w-9 rounded-full ${c.cls} transition ${
                      color === c.key ? 'ring-4 ring-white/30 scale-110' : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit" disabled={isPending}
              className="w-full rounded-lg bg-[#4f46e5] py-3 font-semibold hover:bg-[#4338ca] focus-visible:ring-4 focus-visible:ring-[#4f46e5]/40 outline-none disabled:opacity-60"
            >
              {isPending ? <span className="flex justify-center"><Spinner /></span> : 'Create project'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}