import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DashboardMetrics from '../components/dashboard/DashboardMetrics'
import PrioritiesCard from '../components/dashboard/PrioritiesCard'
import TeamActivityCard from '../components/dashboard/TeamActivityCard'
import TaskDoneChart from '../components/dashboard/TaskDoneChart'
import TaskStatus from '../components/dashboard/TaskStatus'

export default function AnalyticsPage() {
    const navigate = useNavigate()

    return (
        <div className="p-6">
            <button onClick={() => navigate('/dashboard')} className="mb-4 flex items-center gap-1 text-white/70 hover:text-white">
                <ChevronLeft className="h-5 w-5" /> Dashboard
            </button>
            <h2 className="mb-6 text-2xl font-bold">Analytics</h2>
            <DashboardMetrics />
            <div className="grid gap-5 xl:grid-cols-[1.7fr_1fr]">
                <TaskDoneChart />
                <TaskStatus />
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
                <PrioritiesCard />
                <TeamActivityCard />
            </div>
        </div>
    )
}