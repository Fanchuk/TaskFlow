import { Search } from 'lucide-react';

const PRIORITIES = ['all', 'high', 'medium', 'low'] as const;

export default function TaskFilterBar({ search, setSearch, priority, setPriority }: any) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <div className="flex flex-1 items-center gap-2 rounded-lg border border-[#374151] bg-[#1f2937] px-3 py-2">
        <Search className="h-4 w-4 text-white/40" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tasks…"
          className="w-full bg-transparent text-sm outline-none placeholder:text-white/40" />
      </div>
      {PRIORITIES.map((p) => (
        <button key={p} onClick={() => setPriority(p)}
          className={`rounded-full px-3 py-1.5 text-xs capitalize transition-colors ${
            priority === p ? 'bg-[#4f46e5] text-white' : 'border border-[#374151] text-white/60 hover:bg-white/5'
          }`}>{p}</button>
      ))}
    </div>
  );
}