import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Avatar from "../ui/Avatar";
import { useAuthStore } from "../../stores/authStore";

export default function Topbar({ onMenu }: { onMenu: () => void }) {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  return (
    <header className="flex items-center justify-between border-b border-[#374151] bg-[#111827] px-6 py-4">
      <div className="flex items-center gap-3">
        <button className="lg:hidden" onClick={onMenu} aria-label="Menu">
          <Menu className="h-6 w-6 text-white" />
        </button>
        <h1 className="text-xl font-bold text-white md:text-2xl">
          Hi, {user?.fullName?.split(" ")[0] ?? "there"}
        </h1>
      </div>
      
      <button onClick={() => navigate("/settings")} className="relative">
        <Avatar seed={user?.fullName || "User"} size={36} />
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#111827] bg-green-400" />
      </button>
    </header>
  );
}