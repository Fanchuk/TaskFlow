import { useQuery } from '@tanstack/react-query'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { statsService } from '../services/stats.service'
import { PRIORITY_STYLE, type Priority } from '../types'
import Spinner from '../components/ui/Spinner'

export default function MyTasksPage() {
    const navigate = useNavigate()
    const { data: tasks = [], isLoading } = useQuery({ queryKey: ['my-tasks'], queryFn: statsService.myTasks })

    return (
        <div className="p-6">
            <button onClick={() => navigate('/dashboard')} className="mb-4 flex items-center gap-1 text-white/70 hover:text-white">
                <ChevronLeft className="h-5 w-5" /> Dashboard
            </button>
            
            <h2 className="mb-6 text-2xl font-bold">My Tasks</h2>
            
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Spinner />
                </div>
            ) : (
                <div className="space-y-3">
                    {tasks.map((t: any, i: number) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                            onClick={() => navigate(`/projects/${t.project.id}/kanban`)}
                            className="flex cursor-pointer items-center justify-between rounded-xl border border-[#374151] bg-[#1f2937] p-4 hover:border-[#4f46e5]">
                            <div>
                                <p className="font-medium">{t.title}</p>
                                <p className="text-sm text-white/50">{t.project.title}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`rounded-full px-2.5 py-1 text-xs capitalize ${PRIORITY_STYLE[t.priority as Priority]}`}>{t.priority}</span>
                                {t.dueDate && <span className="text-sm text-white/50">{new Date(t.dueDate).toLocaleDateString()}</span>}
                            </div>
                        </motion.div>
                    ))}
                    {tasks.length === 0 && <p className="py-8 text-center text-white/40">No open tasks</p>}
                </div>
            )}
        </div>
    )
}