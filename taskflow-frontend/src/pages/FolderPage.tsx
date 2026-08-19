import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'motion/react'
import { ArrowLeft, Upload as UploadIcon, File as FileIcon } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'
import FileRow from '../components/files/FileRow'
import UploadModal from '../components/files/UploadModal'
import { filesService } from '../services/files.service'

export default function FolderPage() {
    const { id = '' } = useParams()
    const navigate = useNavigate()
    const [uploadOpen, setUploadOpen] = useState(false)

    const { data: folder } = useQuery({ queryKey: ['folder-info', id], queryFn: () => filesService.folderInfo(id) })
    const { data: files = [] } = useQuery({ queryKey: ['folder-files', id], queryFn: () => filesService.folderFiles(id) })

    return (
        <div className="flex h-full flex-col px-6 py-6 md:px-10">
            <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
               <div className="flex items-center gap-4">
                  <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
                      <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <h2 className="text-2xl font-bold md:text-3xl">
                      {folder?.name ?? 'Loading Folder...'} <span className="text-base font-normal text-white/40">({files.length})</span>
                  </h2>
               </div>
               
               <button onClick={() => setUploadOpen(true)} className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-[#4338ca]">
                    <UploadIcon className="h-4 w-4" /> Upload
                </button>
            </header>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 rounded-2xl bg-[#1f2937] p-6 shadow-xl">
                <div className="hidden grid-cols-[2fr_1fr_1.3fr_1fr_auto] gap-4 border-b border-[#374151] pb-3 text-sm text-white/50 md:grid">
                    <span>Name</span>
                    <span>Size</span>
                    <span>Last Modified</span>
                    <span>Members</span>
                    <span />
                </div>
                <div className="divide-y divide-[#374151]/50 pt-2">
                    {files.map((f: any) => (
                        <FileRow key={f.id} file={f} FileIcon={FileIcon} />
                    ))}
                    {files.length === 0 && <div className="py-12 text-center text-sm text-white/40">This folder is empty. Upload a file to get started.</div>}
                </div>
            </motion.div>
            <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} defaultFolderId={id} />
        </div>
    )
}