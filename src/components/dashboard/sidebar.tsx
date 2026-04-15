'use client'

import Link from 'next/link'
import { useAuthStore } from '@/src/stores/auth.store'
import {
    LayoutDashboard,
    PlusSquare,
    FileText,
    Key,
    LogOut,
    Zap,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Buat Post', href: '/dashboard/create', icon: PlusSquare },
    { label: 'Riwayat Post', href: '/dashboard/posts', icon: FileText },
    { label: 'API Keys', href: '/dashboard/api-keys', icon: Key },
]

export default function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { user, logout } = useAuthStore()

    const handleLogout = () => {
        logout()
        router.push('/login')
    }

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-40">
            {/* Logo */}
            <div className="px-6 py-6 flex items-center gap-3">
                <Link href="/dashboard" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                        <Zap className="w-5 h-5 text-white fill-white/20" />
                    </div>
                    <span className="font-bold text-white text-xl tracking-tight">SocialPulse</span>
                </Link>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-4 space-y-1.5">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 group',
                                isActive
                                    ? 'bg-primary text-primary-foreground font-medium shadow-md shadow-primary/10'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            )}
                        >
                            <item.icon className={cn(
                                "w-4 h-4 transition-colors",
                                isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                            )} />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            {/* User info + logout */}
            <div className="px-4 py-4 border-t border-border space-y-4">
                <div className="px-4 py-3 rounded-xl bg-muted/30 border border-border/50">
                    <p className="text-sm font-semibold text-foreground truncate">
                        {user?.businessName || 'Bisnis kamu'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                >
                    <LogOut className="w-4 h-4" />
                    Keluar
                </button>
            </div>
        </aside>
    )
}