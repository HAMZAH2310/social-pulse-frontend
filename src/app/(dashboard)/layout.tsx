'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/src/stores/auth.store'
import Sidebar from '@/src/components/dashboard/sidebar'
import Navbar from '@/src/components/dashboard/navbar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isAuthenticated, user } = useAuthStore()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return

        if (!isAuthenticated) {
            router.push('/login')
            return
        }
        // User yang belum selesai setup diarahkan ke onboarding
        if (user?.onboardingStatus !== 'COMPLETED') {
            router.push('/onboarding')
        }
    }, [mounted, isAuthenticated, user])

    if (!mounted || !isAuthenticated) return null

    return (
        <div className="min-h-screen">
            <Sidebar />
            <Navbar />
            <main className="ml-64 pt-16 p-8 min-h-screen transition-all">
                <div className="mx-auto max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    )
}