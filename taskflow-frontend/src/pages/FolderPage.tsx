import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'motion/react'
import { Menu, Bell, HelpCircle, Moon, ArrowLeft, Upload as UploadIcon, File as FileIcon } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from '../components/dashboard/Sidebar'
import Avatar from '../components/ui/Avatar'
import FileRow from '../components/files/FileRow'
import UploadModal from '../components/files/UploadModal'
import { filesService } from '../services/files.service'
import { useAuthStore } from '../stores/authStore'

export default function FolderPage() {
    const { id = '' } = useParams()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [uploadOpen, setUploadOpen] = useState(false)
    const user = useAuthStore((s) => s.user)

    const { data: folder } = useQuery({ queryKey: ['folder-info', id], queryFn: () => filesService.folderInfo(id) })
    const { data: files = [] } = useQuery({ queryKey: ['folder-files', id], queryFn: () => filesService.folderFiles(id) })

    return (
        <div className="flex h-screen overflow-hidden bg-[#111827] text-white">
            <Sidebar open={open} onClose={() => setOpen(false)} />
            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex items-center justify-between border-b border-[#374151] px-6 py-4">
                    <div className="flex items-center gap-4 text-white/80">
                        <button className="lg:hidden" onClick={() => setOpen(true)}>
                            <Menu className="h-6 w-6" />
                        </button>
                        <Bell className="h-5 w-5" />
                        <HelpCircle className="h-5 w-5" />
                        <Avatar seed={user?.fullName || 'User'} size={32} />
                        <Moon className="h-5 w-5" />
                    </div>
                    <button onClick={() => setUploadOpen(true)} className="flex items-center gap-2 rounded-full bg-[#4f46e5] px-5 py-2.5 text-sm font-semibold hover:bg-[#4338ca]">
                        <UploadIcon className="h-4 w-4" /> Upload to folder
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    <button onClick={() => navigate('/files')} className="mb-4 flex items-center gap-2 text-sm text-white/60 hover:text-white">
                        <ArrowLeft className="h-4 w-4" /> Back to Files
                    </button>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-[#1f2937] p-6">
                        <h3 className="mb-4 text-2xl font-bold">
                            {folder?.name ?? 'Folder'} <span className="text-base font-normal text-white/40">({files.length} files)</span>
                        </h3>
                        <div className="hidden grid-cols-[2fr_1fr_1.3fr_1fr_auto] gap-4 border-b border-[#374151] pb-3 text-sm text-white/50 md:grid">
                            <span>Name</span>
                            <span>Size</span>
                            <span>Last Modified</span>
                            <span>Members</span>
                            <span />
                        </div>
                        <div className="divide-y divide-[#374151]/50">
                            {files.map((f: any) => (
                                <FileRow key={f.id} file={f} FileIcon={FileIcon} />
                            ))}
                            {files.length === 0 && <p className="py-8 text-center text-sm text-white/40">Empty folder — upload a file</p>}
                        </div>
                    </motion.div>
                </main>
            </div>
            <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} defaultFolderId={id} />
        </div>
    )
}
