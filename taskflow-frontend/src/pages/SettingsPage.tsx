import { useState } from 'react'
import { User, Shield, Users } from 'lucide-react'
import { motion } from 'motion/react'
import ProfileTab from '../components/settings/ProfileTab'
import AccountTab from '../components/settings/AccountTab'
import TeamTab from '../components/settings/TeamTab'

const TABS = [
    { key: 'profile', label: 'Profile Settings', icon: User },
    { key: 'account', label: 'Account Management', icon: Shield },
    { key: 'team', label: 'Team & Permissions', icon: Users },
]

export default function SettingsPage() {
    const [tab, setTab] = useState('profile')

    return (
        <div className="p-6 md:p-10">
            <div className="mx-auto flex max-w-5xl flex-col gap-6 lg:flex-row">
                <div className="h-fit rounded-xl bg-[#1f2937] p-3 lg:w-[280px]">
                    {TABS.map(({ key, label, icon: Icon }) => (
                        <motion.button
                            key={key}
                            whileHover={{ x: 3 }}
                            onClick={() => setTab(key)}
                            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-colors ${
                                tab === key ? 'bg-[#4f46e5]/20 font-semibold text-[#a5b4fc]' : 'text-white/70 hover:bg-white/5'
                            }`}>
                            <Icon className="h-5 w-5" /> {label}
                        </motion.button>
                    ))}
                </div>

                <div className="flex-1">
                    {tab === 'profile' && <ProfileTab />}
                    {tab === 'account' && <AccountTab />}
                    {tab === 'team' && <TeamTab />}
                </div>
            </div>
        </div>
    )
}