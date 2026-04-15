'use client'

import { useAuthStore } from '@/src/stores/auth.store'
import { useRouter } from 'next/navigation'
import { Clock, MessageCircle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const steps = [
    { label: 'Daftar akun', done: true },
    { label: 'Admin menghubungi via WhatsApp', done: false },
    { label: 'Setup kredensial FB/IG', done: false },
    { label: 'Akun aktif & siap digunakan', done: false },
]

export default function OnboardingPage() {
    const { user, logout } = useAuthStore()
    const router = useRouter()

    const message = `Halo admin SocialPulse, saya ${user?.fullName} (${user?.email}) sudah mendaftar dan menunggu proses setup.`
    const waLink = `https://wa.me/?text=${encodeURIComponent(message)}`

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
            <div className="w-full max-w-md space-y-8">

                {/* Icon & Heading */}
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-yellow-500/10 rounded-[2rem] flex items-center justify-center mx-auto border border-yellow-500/20 shadow-2xl shadow-yellow-500/5">
                        <Clock className="w-10 h-10 text-yellow-500" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-foreground tracking-tight">Akun Sedang Disiapkan</h1>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Tim admin kami akan menghubungi kamu via <span className="text-emerald-500 font-semibold">WhatsApp</span> untuk menyelesaikan setup platform.
                        </p>
                    </div>
                </div>

                {/* Progress steps */}
                <div className="glass-card rounded-[1.5rem] p-6 space-y-5 border-white/5 shadow-inner">
                    <p className="text-[10px] items-center font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">Tahapan Aktivasi</p>
                    <div className="space-y-4">
                        {steps.map((step, i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${step.done
                                    ? 'bg-emerald-500 border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                    : 'bg-muted/50 border border-border group-hover:border-primary/50'
                                    }`}>
                                    {step.done
                                        ? <CheckCircle className="w-4 h-4 text-white" />
                                        : <span className="text-xs font-bold text-muted-foreground">{i + 1}</span>
                                    }
                                </div>
                                <span className={`text-sm font-medium transition-colors ${step.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info user */}
                <div className="bg-secondary/30 backdrop-blur-sm border border-border/50 rounded-2xl p-5 space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Nama Bisnis</span>
                        <span className="text-foreground font-semibold">{user?.businessName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">WhatsApp</span>
                        <span className="text-foreground font-semibold">{user?.whatsappNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Status</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                            {user?.onboardingStatus === 'IN_PROGRESS' ? 'Sedang Diproses' : 'Menunggu Setup'}
                        </span>
                    </div>
                </div>

                {/* CTA */}
                <div className="space-y-4 pt-2">
                    <Button
                        className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98]"
                        onClick={() => window.open(waLink, '_blank', 'noopener,noreferrer')}
                    >
                        <MessageCircle className="w-5 h-5 mr-2 fill-white/20" />
                        Chat Admin Sekarang
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full h-11 text-muted-foreground hover:text-destructive hover:bg-destructive/5 font-medium transition-colors"
                        onClick={() => { logout(); router.push('/login') }}
                    >
                        Keluar dari Akun
                    </Button>
                </div>

                <p className="text-center text-[10px] text-muted-foreground/40 font-medium">
                    SOCIALPULSE © {new Date().getFullYear()} — PREMIUM SOCIAL MEDIA PANEL
                </p>
            </div>
        </div>
    )
}