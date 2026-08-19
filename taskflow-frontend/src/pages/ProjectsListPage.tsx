import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Plus, Search, FolderClosed } from 'lucide-react'
import ProjectCard from '../components/dashboard/ProjectCard'
import Spinner from '../components/ui/Spinner'
import { projectsService } from '../services/projects.service'

export default function ProjectsListPage() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const { data: projects = [], isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: projectsService.getAll,
    })

    const filtered = projects.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="p-6">
            <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Projects</h2>
                    <p className="mt-1 text-sm text-white/50">
                        {projects.length} project{projects.length !== 1 ? 's' : ''} total
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-lg border border-[#4b5563] bg-[#374151] px-4 py-2.5 focus-within:border-[#6366f1]">
                        <Search className="h-4 w-4 text-white/60" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search projects..."
                            className="w-40 bg-transparent text-sm outline-none placeholder:text-white/50 md:w-52"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/projects/new')}
                        className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-4 py-2.5 text-sm font-semibold hover:bg-[#4338ca]">
                        <Plus className="h-4 w-4" /> New Project
                    </motion.button>
                </div>
            </motion.div>

            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Spinner />
                </div>
            ) : projects.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#374151] py-24">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4f46e5]/15">
                        <FolderClosed className="h-8 w-8 text-[#a5b4fc]" />
                    </span>
                    <h3 className="mt-5 text-xl font-bold">No projects yet</h3>
                    <p className="mt-1 text-sm text-white/50">Create your first project to get started</p>
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => navigate('/projects/new')}
                        className="mt-6 flex items-center gap-2 rounded-lg bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold hover:bg-[#4338ca]">
                        <Plus className="h-4 w-4" /> Create Project
                    </motion.button>
                </motion.div>
            ) : filtered.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#374151] py-20 text-center text-white/50">No projects match "{search}"</div>
            ) : (
                <motion.div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
                    {filtered.map((p) => (
                        <motion.div key={p.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                            <ProjectCard {...p} onClick={() => navigate(`/projects/${p.id}`, { state: { from: '/projects' } })} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    )
}