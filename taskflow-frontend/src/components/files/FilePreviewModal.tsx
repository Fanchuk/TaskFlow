import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Download, Check, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import Modal from "../ui/Modal";
import Avatar from "../ui/Avatar";
import { filesService, type FileItem } from "../../services/files.service";

export default function FilePreviewModal({ file, open, onClose }: { file: FileItem; open: boolean; onClose: () => void }) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(file.name);

  const { data: folders = [] } = useQuery({ queryKey: ["folders"], queryFn: filesService.folders });

  const invalidate = () => ["recent-files", "all-files", "folder-files"].forEach((k) => qc.invalidateQueries({ queryKey: [k] }));

  const rename = useMutation({
    mutationFn: () => filesService.rename(file.id, name),
    onSuccess: () => { invalidate(); setEditing(false); toast.success("Renamed"); },
  });

  const move = useMutation({
    mutationFn: (folderId: string | null) => filesService.move(file.id, folderId),
    onSuccess: () => { invalidate(); qc.invalidateQueries({ queryKey: ["folders"] }); toast.success("Moved"); },
  });

  const members = [file.owner, ...file.shares.map((s) => s.user)];

  const handleDownload = () => {
    const content = `File: ${file.name}\nSize: ${file.size} bytes\nType: ${file.mime || "unknown"}\nCreated: ${new Date(file.createdAt).toLocaleString()}\nOwner: ${file.owner.fullName}\nShared with: ${file.shares.map((s) => s.user.fullName).join(", ") || "nobody"}\n\n--- TaskFlow demo file ---\nThis is a placeholder. In production, the real file content would be served from storage (S3 / disk).`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.includes(".") ? file.name : `${file.name}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Download started");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-white">
        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <input value={name} onChange={(e) => setName(e.target.value)} autoFocus
                className="flex-1 rounded-lg border border-[#374151] bg-[#111827] px-3 py-2 outline-none focus:border-[#4f46e5]" />
              <button onClick={() => name.trim() && rename.mutate()} className="rounded-lg bg-[#4f46e5] p-2 hover:bg-[#4338ca]">
                <Check className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <h3 className="flex-1 text-xl font-bold truncate">{file.name}</h3>
              <button onClick={() => { setName(file.name); setEditing(true); }} className="rounded-lg p-2 hover:bg-white/10">
                <Pencil className="h-4 w-4 text-white/60" />
              </button>
            </>
          )}
        </div>

        <div className="mt-4 space-y-2 text-sm text-white/60">
          <div className="flex justify-between"><span>Size</span><span className="text-white">{(file.size / 1024).toFixed(1)} KB</span></div>
          <div className="flex justify-between"><span>Type</span><span className="text-white">{file.mime || "unknown"}</span></div>
          <div className="flex justify-between"><span>Created</span><span className="text-white">{new Date(file.createdAt).toLocaleDateString()}</span></div>
        </div>

        <label className="mt-5 block text-sm text-white/70">Move to folder</label>
        <div className="relative mt-2">
          <select value={file.folderId ?? ""} onChange={(e) => move.mutate(e.target.value || null)}
            className="w-full appearance-none rounded-lg border border-[#374151] bg-[#111827] py-2.5 pl-4 pr-10 text-sm outline-none focus:border-[#4f46e5]">
            <option value="">No folder</option>
            {folders.map((f: any) => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
        </div>

        <div className="mt-5">
          <p className="text-sm text-white/70">Members ({members.length})</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {members.map((m, i) => (
              <div key={i} className="flex items-center gap-2 rounded-full bg-[#111827] px-3 py-1.5">
                <Avatar seed={m.fullName} size={22} />
                <span className="text-xs">{m.fullName}</span>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleDownload} className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-[#374151] py-3 font-medium hover:bg-white/5">
          <Download className="h-4 w-4" /> Download
        </button>
      </div>
    </Modal>
  );
}