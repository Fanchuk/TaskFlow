import { LayoutDashboard, FolderClosed, Users, Settings, FilePlus2, LogOut, BarChart3 } from "lucide-react";
import { motion } from "motion/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import Avatar from "../ui/Avatar";

const NAV = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Projects", icon: FolderClosed, path: "/projects" },
  { label: "Team", icon: Users, path: "/team" },
  { label: "Settings", icon: Settings, path: "/settings" },
  { label: "Files", icon: FilePlus2, path: "/files" },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed z-40 flex h-full w-[222px] flex-col bg-[#4f46e5] text-white transition-transform lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-6 py-6"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
            <BarChart3 className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold">TaskFlow</span>
        </motion.div>

        <nav className="flex-1 space-y-1 px-4 pt-2">
          {NAV.map(({ label, icon: Icon, path }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              whileHover={{ x: 4 }}
            >
              <NavLink
                to={path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-[7px] px-3.5 py-2.5 text-sm transition-colors ${
                    isActive ? "bg-[#4338ca] font-semibold" : "text-white/85 hover:bg-white/10"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {label}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <div className="px-4 pb-6">
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-white/85 hover:bg-white/10"
          >
            <LogOut className="h-5 w-5" /> Log out
          </button>
          
          <div
            onClick={() => {
              navigate("/settings");
              onClose();
            }}
            className="mt-4 flex cursor-pointer items-center gap-3 border-t border-white/15 pt-4 transition-opacity hover:opacity-80"
          >
            <Avatar seed={user?.fullName || "User"} size={40} />
            <div>
              <p className="text-sm font-semibold">{user?.fullName ?? "User"}</p>
              <p className="text-xs text-white/70">{user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Member"}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}