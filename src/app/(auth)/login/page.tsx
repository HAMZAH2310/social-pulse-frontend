'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api, getErrorMessage } from '@/src/lib/api'
import { useAuthStore } from '@/src/stores/auth.store'
import { AuthResponse, LoginPayload } from '@/src/types/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Zap, ShieldCheck } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { setAuth } = useAuthStore()

    const [form, setForm] = useState<LoginPayload>({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await api.post('auth/login', { json: form }).json<AuthResponse>()
            setAuth(res.data.token, res.data.user)

            const redirect = searchParams.get('redirect')
            if (redirect && redirect.startsWith('/')) {
                router.push(redirect)
            } else if (res.data.user.onboardingStatus === 'COMPLETED') {
                router.push('/dashboard')
            } else {
                router.push('/onboarding')
            }
        } catch (err) {
            setError(await getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
            {/* Background Ornaments */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />
            
            <div className="w-full max-w-md space-y-8">
                {/* Brand */}
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20">
                        <Zap className="w-8 h-8 text-white fill-white/20" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-foreground tracking-tight">Selamat Datang</h1>
                        <p className="text-sm text-muted-foreground font-medium">Masuk ke portal premium SocialPulse</p>
                    </div>
                </div>

                <div className="glass-card rounded-[2rem] p-8 border-white/5 shadow-2xl space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive rounded-xl">
                                <AlertDescription className="font-medium text-xs">{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">E-Mail Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="budi@example.com"
                                className="h-12 bg-muted/30 border-border/50 rounded-xl px-4 focus:ring-primary/20 transition-all font-medium"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Your Password</Label>
                                <span className="text-xs text-primary/50 font-bold">Forgot?</span>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                className="h-12 bg-muted/30 border-border/50 rounded-xl px-4 focus:ring-primary/20 transition-all font-medium"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all" disabled={loading}>
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> 
                                    Mengautentikasi...
                                </span>
                            ) : 'Akses Dashboard'}
                        </Button>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/50"></div></div>
                            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[.2em] text-muted-foreground/50">
                                <span className="bg-card px-2">Secure Gateway</span>
                            </div>
                        </div>

                        <p className="text-center text-sm text-muted-foreground font-medium">
                            Baru di sini?{' '}
                            <Link href="/register" className="text-primary hover:text-primary/80 font-bold underline-offset-4 hover:underline transition-all">
                                Buat Akun Premium
                            </Link>
                        </p>
                    </form>
                </div>

                <div className="flex items-center justify-center gap-2 text-muted-foreground/40 font-bold text-[10px] uppercase tracking-widest">
                    <ShieldCheck className="w-3 h-3" />
                    Encrypted Connection via SSL/TLS
                </div>
            </div>
        </div>
    )
}