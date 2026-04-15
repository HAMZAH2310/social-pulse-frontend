'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/src/stores/auth.store'
import Sidebar from '@/src/components/dashboard/sidebar'
import Navbar from '@/src/components/dashboard/navbar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isAuthenticated, user, _hasHydrated } = useAuthStore()
    const router = useRouter()
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted || !_hasHydrated) return

        if (!isAuthenticated) {
            router.push('/login')
            return
        }
        
        // User yang belum selesai setup diarahkan ke onboarding
        if (user?.onboardingStatus !== 'COMPLETED' && pathname !== '/onboarding') {
            router.push('/onboarding')
        }
    }, [mounted, _hasHydrated, isAuthenticated, user, pathname])

    if (!mounted || !_hasHydrated || !isAuthenticated) return null

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