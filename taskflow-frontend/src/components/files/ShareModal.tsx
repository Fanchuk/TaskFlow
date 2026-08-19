import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserPlus, X } from "lucide-react";
import toast from "react-hot-toast";
import Avatar from "../ui/Avatar";
import Modal from "../ui/Modal";
import { filesService, type FileItem } from "../../services/files.service";
import { usersService } from "../../services/users.service";

interface ShareModalProps {
  file: FileItem;
  open: boolean;
  onClose: () => void;
}

export default function ShareModal({ file, open, onClose }: ShareModalProps) {
  const qc = useQueryClient();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        return await usersService.getAll();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to load team members");
        throw error;
      }
    },
  });

  const sharedIds = new Set(file.shares.map((s) => s.user.id));

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["recent-files"] });
    qc.invalidateQueries({ queryKey: ["all-files"] });
  };

  const share = useMutation({
    mutationFn: (userId: string) => filesService.share(file.id, userId),
    onSuccess: () => {
      invalidate();
      toast.success("Shared");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to share file");
    }
  });

  const unshare = useMutation({
    mutationFn: (userId: string) => filesService.unshare(file.id, userId),
    onSuccess: () => {
      invalidate();
      toast.success("Removed");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to remove share");
    }
  });

  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-white">
        <h3 className="text-xl font-bold">Share "{file.name}"</h3>
        <p className="mt-1 text-sm text-white/50">Owner: {file.owner.fullName}</p>
        <div className="mt-5 max-h-72 space-y-2 overflow-y-auto">
          {isLoading && <p className="mt-5 text-sm text-white/50">Loading team…</p>}
          {!isLoading && users.filter((u: any) => u.id !== file.owner.id).length === 0 && (
            <p className="mt-5 text-sm text-white/40">No other team members to share with</p>
          )}
          {!isLoading && users
            .filter((u: any) => u.id !== file.owner.id)
            .map((u: any) => {
              const isShared = sharedIds.has(u.id);
              return (
                <div
                  key={u.id}
                  className="flex items-center gap-3 rounded-lg border border-[#374151] bg-[#111827] p-3"
                >
                  <Avatar seed={u.fullName} size={36} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{u.fullName}</p>
                    <p className="text-xs text-white/50">{u.email}</p>
                  </div>
                  {isShared ? (
                    <button
                      onClick={() => unshare.mutate(u.id)}
                      disabled={unshare.isPending}
                      className="flex items-center gap-1 rounded-lg bg-red-500/10 px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/20 disabled:opacity-50"
                    >
                      <X className="h-3.5 w-3.5" /> Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => share.mutate(u.id)}
                      disabled={share.isPending}
                      className="flex items-center gap-1 rounded-lg bg-[#4f46e5] px-3 py-1.5 text-sm font-medium hover:bg-[#4338ca] disabled:opacity-50"
                    >
                      <UserPlus className="h-3.5 w-3.5" /> Add
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </Modal>
  );
}