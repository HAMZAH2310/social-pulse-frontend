'use client'

import { useAuthStore } from '@/src/stores/auth.store'
import { Bell, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

import { ONBOARDING_STATUS_MAP } from '@/src/lib/constants'

export default function Navbar() {
    const { user } = useAuthStore()
    const status = user?.onboardingStatus
        ? ONBOARDING_STATUS_MAP[user.onboardingStatus]
        : ONBOARDING_STATUS_MAP.PENDING

    return (
        <header className="fixed top-0 left-64 right-0 h-16 glass border-b border-border/50 flex items-center justify-between px-8 z-30">

            {/* Kiri — Greeting */}
            <div className="flex flex-col">
                <h1 className="text-sm font-semibold text-foreground tracking-tight">
                    Halo, <span className="text-primary">{user?.fullName?.split(' ')[0] || 'User'}</span> 👋
                </h1>
                <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/60">
                    {new Date().toLocaleDateString('id-ID', {
                         year: 'numeric', month: 'long', day: 'numeric'
                    })}
                </p>
            </div>

            {/* Kanan */}
            <div className="flex items-center gap-4">
                {/* Status badge */}
                <Badge variant="outline" className={cn(
                    "text-[11px] px-3 py-1 rounded-full border font-semibold tracking-wide shadow-none",
                    status.className
                )}>
                    {status.label}
                </Badge>

                <div className="h-4 w-[1px] bg-border mx-1" />

                {/* Search / Actions */}
                <button aria-label="Search" className="w-9 h-9 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
                    <Search className="w-4 h-4" />
                </button>

                <button aria-label="Notifications" className="w-9 h-9 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all relative">
                    <Bell className="w-4 h-4" />
                    <span aria-hidden="true" className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full" />
                </button>

                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary/60 border-2 border-background flex items-center justify-center text-white text-xs font-bold shadow-xl shadow-primary/20 cursor-pointer hover:scale-105 transition-transform">
                    {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                </div>
            </div>
        </header>
    )
}