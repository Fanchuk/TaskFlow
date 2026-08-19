import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, Filter } from 'lucide-react'
import { motion } from 'motion/react'
import { projectsService } from '../services/projects.service'
import ProjectCard from '../components/dashboard/ProjectCard'
import TaskDoneChart from '../components/dashboard/TaskDoneChart'
import TaskStatus from '../components/dashboard/TaskStatus'
import DashboardMetrics from '../components/dashboard/DashboardMetrics'
import DeadlinesCard from '../components/dashboard/DeadlinesCard'
import PrioritiesCard from '../components/dashboard/PrioritiesCard'
import TeamActivityCard from '../components/dashboard/TeamActivityCard'
import QuickActions from '../components/dashboard/QuickActions'
import Spinner from '../components/ui/Spinner'

export default function DashboardPage() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const { data: projects = [], isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: projectsService.getAll,
    })

    const filtered = projects.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="p-6">
            <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-lg border border-[#4b5563] bg-[#374151] px-4 py-2.5 transition-colors focus-within:border-[#6366f1]">
                        <Search className="h-4 w-4 text-white/60" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-40 bg-transparent text-sm outline-none placeholder:text-white/50 md:w-52"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/projects/new')}
                        className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-4 py-2.5 text-sm font-semibold outline-none transition-colors hover:bg-[#4338ca] focus-visible:ring-4 focus-visible:ring-[#4f46e5]/40">
                        <Plus className="h-4 w-4" /> New Project
                    </motion.button>
                </div>
            </motion.div>

            <DashboardMetrics />
            <QuickActions />

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Spinner />
                </div>
            ) : filtered.length === 0 ? (
                <div className="rounded-lg border border-dashed border-[#374151] py-20 text-center">
                    <p className="text-white/60">{search ? 'No projects match your search.' : 'No projects yet. Create your first one.'}</p>
                </div>
            ) : (
                <motion.div
                    className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
                    initial="hidden"
                    animate="show"
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
                    {filtered.map((p) => (
                        <motion.div key={p.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                            <ProjectCard {...p} onClick={() => navigate(`/projects/${p.id}`, { state: { from: '/dashboard' } })} />
                        </motion.div>
                    ))}

                    <motion.div
                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                        whileHover={{ y: -4, borderColor: '#4f46e5' }}
                        className="rounded-lg border border-[#374151] bg-[#1f2937] p-5 transition-colors">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">Upcoming Tasks</h3>
                            <motion.div whileHover={{ rotate: 15 }}>
                                <Filter className="h-5 w-5 text-white/60" />
                            </motion.div>
                        </div>
                        <p className="mt-10 text-center text-white/60">No upcoming tasks for the next 7 days</p>
                    </motion.div>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5 }}
                className="mt-6 grid gap-5 xl:grid-cols-[1.7fr_1fr]">
                <TaskDoneChart />
                <TaskStatus />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                <DeadlinesCard />
                <PrioritiesCard />
                <TeamActivityCard />
            </motion.div>
        </div>
    )
}