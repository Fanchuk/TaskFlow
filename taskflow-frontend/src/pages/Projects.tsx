import { Outlet, useParams, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, LayoutDashboard, List, CalendarDays, BarChart3 } from 'lucide-react';
import Spinner from '../components/ui/Spinner';
import AiPanel from '../components/project/AiPanel';
import { projectsService } from '../services/projects.service';

const VIEWS = [
  { to: 'overview', label: 'Overview', icon: LayoutDashboard },
  { to: 'kanban', label: 'Kanban', icon: LayoutDashboard },
  { to: 'list', label: 'List', icon: List },
  { to: 'calendar', label: 'Calendar', icon: CalendarDays },
  { to: 'timeline', label: 'Timeline', icon: BarChart3 },
];

export default function ProjectLayout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/projects';
  const backLabel = from === '/dashboard' ? 'Dashboard' : 'Projects';

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsService.getOne(id!),
    enabled: !!id,
  });

  return (
    <div className="flex h-full flex-col px-6 py-6 md:px-10">
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <button onClick={() => navigate(from)} className="flex items-center gap-1 text-white/60 hover:text-white">
                  <ChevronLeft className="h-5 w-5" />
                  <span className="text-sm">{backLabel}</span>
                </button>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <h2 className="text-2xl font-bold md:text-3xl">{project?.title}</h2>
                <span className="h-3 w-3 rounded-full bg-[#4f46e5]" />
              </div>
              <p className="mt-1 text-white/60">{project?.desc}</p>
            </div>

            <div className="flex items-center gap-3 lg:pl-0">
              <div className="flex items-center rounded-lg bg-[#1f2937] p-1">
                {VIEWS.map((v) => (
                  <NavLink
                    key={v.to}
                    to={v.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isActive ? 'bg-[#4f46e5] text-white' : 'text-white/60 hover:text-white'
                      }`
                    }
                  >
                    <v.icon className="h-4 w-4" /> {v.label}
                  </NavLink>
                ))}
              </div>
              {project && (
                <AiPanel title={project.title} desc={project.desc} />
              )}
            </div>
          </div>

          <div className="mt-6">
            <Outlet context={{ projectId: id }} />
          </div>
        </>
      )}
    </div>
  );
}