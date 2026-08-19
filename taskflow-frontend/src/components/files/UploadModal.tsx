import { useState, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Upload as UploadIcon, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import Modal from "../ui/Modal";
import Spinner from "../ui/Spinner";
import { filesService } from "../../services/files.service";

export default function  UploadModal({ open, onClose, defaultFolderId }: { open: boolean; onClose: () => void; defaultFolderId?: string }) {
  const qc = useQueryClient();
  const fileInput = useRef<HTMLInputElement>(null);
  const [folderId, setFolderId] = useState<string>(defaultFolderId ?? "");
  const [picked, setPicked] = useState<File | null>(null);

  const { data: folders = [] } = useQuery({ queryKey: ["folders"], queryFn: filesService.folders });

  const upload = useMutation({
    mutationFn: (f: File) => filesService.createFile({ name: f.name, size: f.size, mime: f.type, folderId: folderId || undefined }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["recent-files"] });
      qc.invalidateQueries({ queryKey: ["all-files"] });
      qc.invalidateQueries({ queryKey: ["folder-files"] });
      qc.invalidateQueries({ queryKey: ["storage"] });
      qc.invalidateQueries({ queryKey: ["folders"] });
      toast.success("File uploaded");
      setPicked(null);
      onClose();
    },
    onError: () => toast.error("Upload failed"),
  });

  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-white">
        <h3 className="text-xl font-bold">Upload file</h3>

        <input ref={fileInput} type="file" className="hidden" onChange={(e) => setPicked(e.target.files?.[0] ?? null)} />
        <button onClick={() => fileInput.current?.click()}
          className="mt-5 flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-[#374151] bg-[#111827] py-8 hover:border-[#4f46e5]">
          <UploadIcon className="h-6 w-6 text-white/50" />
          <span className="text-sm text-white/70">{picked ? picked.name : "Click to choose a file"}</span>
        </button>

        <label className="mt-5 block text-sm text-white/70">Folder</label>
        <div className="relative mt-2">
          <select value={folderId} onChange={(e) => setFolderId(e.target.value)}
            className="w-full appearance-none rounded-lg border border-[#374151] bg-[#111827] py-2.5 pl-4 pr-10 text-sm outline-none focus:border-[#4f46e5]">
            <option value="">No folder</option>
            {folders.map((f: any) => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
        </div>

        <button onClick={() => picked && upload.mutate(picked)} disabled={!picked || upload.isPending}
          className="mt-6 w-full rounded-lg bg-[#4f46e5] py-3 font-semibold hover:bg-[#4338ca] disabled:opacity-60">
          {upload.isPending ? <span className="flex justify-center"><Spinner /></span> : "Upload"}
        </button>
      </div>
    </Modal>
  );
}