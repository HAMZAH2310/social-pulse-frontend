'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/src/stores/auth.store'
import { api } from '@/src/lib/api'
import StatsCard from '@/src/components/dashboard/stats-card'
import {
    FileText,
    Clock,
    CheckCircle,
    XCircle,
    TrendingUp,
    Calendar,
    ArrowUpRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PostStats {
    total: number
    pending: number
    scheduled: number
    posted: number
    failed: number
    thisMonth: number
}

export default function DashboardPage() {
    const { user } = useAuthStore()
    const [stats, setStats] = useState<PostStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const posts = await api.get('posts').json<{ success: boolean; data: any[] }>()

                const now = new Date()
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

                const data = posts.data
                setStats({
                    total: data.length,
                    pending: data.filter((p) => p.status === 'PENDING').length,
                    scheduled: data.filter((p) => p.status === 'SCHEDULED').length,
                    posted: data.filter((p) => p.status === 'POSTED').length,
                    failed: data.filter((p) => p.status === 'FAILED').length,
                    thisMonth: data.filter((p) => new Date(p.createdAt) >= startOfMonth).length,
                })
            } catch {
                setStats({ total: 0, pending: 0, scheduled: 0, posted: 0, failed: 0, thisMonth: 0 })
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    return (
        <div className="space-y-10 pb-12">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-foreground tracking-tight">Overview</h2>
                    <p className="text-sm text-muted-foreground font-medium">
                        Pantau performa dan statistik posting sosial media kamu
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-10 rounded-xl px-4 font-semibold border-white/5 hover:bg-muted/50" disabled aria-label="Ekspor Laporan (Segera Hadir)">
                        Ekspor Laporan
                    </Button>
                    <Link href="/dashboard/create">
                        <Button className="h-10 rounded-xl px-4 font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground">
                            Buat Post Baru <ArrowUpRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Platform Status Banner */}
            <div className="relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent opacity-50 transition-opacity group-hover:opacity-70" />
                <div className="relative glass-card border-primary/20 rounded-[2rem] p-8 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                        <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <p className="text-lg font-bold text-foreground">Sistem Operasional</p>
                        <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                            Terhubung ke <span className="text-primary font-bold">{user?.businessName}</span>. 
                            Otomasi posting berjalan lancar dengan status koneksi prima.
                        </p>
                    </div>
                    <div className="px-6 py-2 rounded-full bg-emerald-500/10 text-emerald-500 text-[11px] font-bold uppercase tracking-widest border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                        {user?.onboardingStatus === 'COMPLETED' ? 'System Active' : 'Setup Pending'}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-1 bg-primary rounded-full" />
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">Statistik Utama</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="glass-card rounded-2xl p-6 h-40 animate-pulse bg-muted/20" />
                        ))
                    ) : (
                        <>
                            <StatsCard
                                title="Total Post"
                                value={stats?.total ?? 0}
                                description="Seluruh postingan Anda"
                                icon={FileText}
                                iconColor="text-primary"
                            />
                            <StatsCard
                                title="Bulan Ini"
                                value={`${stats?.thisMonth ?? 0}/10`}
                                description="Penggunaan kuota bulanan"
                                icon={TrendingUp}
                                iconColor="text-blue-500"
                                trend={stats && stats.thisMonth >= 10 ? 'down' : 'up'}
                                trendValue={stats ? (stats.thisMonth >= 10 ? 'Kuota habis' : `${10 - stats.thisMonth} kuota sisa`) : ''}
                            />
                            <StatsCard
                                title="Terjadwal"
                                value={stats?.scheduled ?? 0}
                                description="Post menunggu tayang"
                                icon={Calendar}
                                iconColor="text-amber-500"
                            />
                            <StatsCard
                                title="Antrian"
                                value={stats?.pending ?? 0}
                                description="Post dalam proses draft"
                                icon={Clock}
                                iconColor="text-orange-500"
                            />
                            <StatsCard
                                title="Berhasil"
                                value={stats?.posted ?? 0}
                                description="Post yang sudah tayang live"
                                icon={CheckCircle}
                                iconColor="text-emerald-500"
                                trend="up"
                                trendValue="Live Success"
                            />
                            <StatsCard
                                title="Gagal"
                                value={stats?.failed ?? 0}
                                description="Butuh tindakan segera"
                                icon={XCircle}
                                iconColor="text-rose-500"
                                trend={stats && stats.failed > 0 ? 'down' : 'neutral'}
                                trendValue={stats && stats.failed > 0 ? 'Perlu Review' : 'Semua Beres'}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}