import { Search, ArrowUpDown } from "lucide-react";

export type SortKey = "date" | "name" | "size";
export type TypeFilter = "all" | "image" | "video" | "document" | "other";

const TYPES: { key: TypeFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "image", label: "Images" },
  { key: "document", label: "Documents" },
  { key: "video", label: "Media" },
  { key: "other", label: "Other" },
];

function mimeCategory(mime: string): TypeFilter {
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/") || mime.startsWith("audio/")) return "video";
  if (mime.includes("pdf") || mime.includes("doc") || mime.includes("text")) return "document";
  return "other";
}

export function filterAndSort<T extends { name: string; size: number; mime: string; createdAt: string }>(
  files: T[], search: string, type: TypeFilter, sort: SortKey
): T[] {
  return files
    .filter((f) => f.name.toLowerCase().startsWith(search.toLowerCase()))
    .filter((f) => type === "all" || mimeCategory(f.mime) === type)
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "size") return b.size - a.size;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}

export default function FileToolbar({
  search, setSearch, type, setType, sort, setSort,
}: {
  search: string; setSearch: (v: string) => void;
  type: TypeFilter; setType: (v: TypeFilter) => void;
  sort: SortKey; setSort: (v: SortKey) => void;
}) {
  return (
    <div className="mb-4 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-[#374151] bg-[#111827] px-3 py-2">
          <Search className="h-4 w-4 text-white/40" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search files…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-white/40" />
        </div>
        <button onClick={() => setSort(sort === "date" ? "name" : sort === "name" ? "size" : "date")}
          className="flex items-center gap-2 rounded-lg border border-[#374151] bg-[#111827] px-3 py-2 text-sm text-white/70 hover:bg-white/5">
          <ArrowUpDown className="h-4 w-4" /> {sort === "date" ? "Date" : sort === "name" ? "Name" : "Size"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <button key={t.key} onClick={() => setType(t.key)}
            className={`rounded-full px-3 py-1 text-xs transition-colors ${
              type === t.key ? "bg-[#4f46e5] text-white" : "border border-[#374151] text-white/60 hover:bg-white/5"
            }`}>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}