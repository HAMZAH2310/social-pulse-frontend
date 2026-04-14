'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api, getErrorMessage } from '@/src/lib/api'
import { useAuthStore } from '@/src/stores/auth.store'
import { AuthResponse, RegisterPayload } from '@/src/types/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Zap, ShieldCheck } from 'lucide-react'

export default function RegisterPage() {
    const router = useRouter()
    const { setAuth } = useAuthStore()

    const [form, setForm] = useState<RegisterPayload>({
        email: '',
        password: '',
        fullName: '',
        whatsappNumber: '',
        businessName: '',
        businessType: 'bisnis',
    })
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
            const res = await api.post('auth/register', { json: form }).json<AuthResponse>()
            setAuth(res.data.token, res.data.user)
            router.push(
                res.data.user.onboardingStatus === 'COMPLETED'
                    ? '/dashboard'
                    : '/onboarding'
            )
        } catch (err) {
            setError(await getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-20 relative overflow-hidden">
             {/* Background Ornaments */}
             <div className="absolute top-0 right-1/2 translate-x-1/2 w-[1200px] h-[700px] bg-primary/5 blur-[150px] rounded-full -z-10" />

            <div className="w-full max-w-xl space-y-8">
                {/* Brand */}
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20">
                        <Zap className="w-8 h-8 text-white fill-white/20" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-foreground tracking-tight">Mulai Perjalanan Anda</h1>
                        <p className="text-sm text-muted-foreground font-medium">Bergabung dengan ekosistem automasi SocialPulse premium</p>
                    </div>
                </div>

                <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border-white/5 shadow-2xl space-y-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive rounded-xl">
                                <AlertDescription className="font-medium text-xs">{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Full Name</Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Budi Santoso"
                                    className="h-12 bg-muted/30 border-border/50 rounded-xl px-4"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Work Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="budi@company.com"
                                    className="h-12 bg-muted/30 border-border/50 rounded-xl px-4"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Secure Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-12 bg-muted/30 border-border/50 rounded-xl px-4"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="whatsappNumber" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">WhatsApp Number</Label>
                                <Input
                                    id="whatsappNumber"
                                    name="whatsappNumber"
                                    placeholder="081234567890"
                                    className="h-12 bg-muted/30 border-border/50 rounded-xl px-4"
                                    value={form.whatsappNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="businessName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Business Name</Label>
                                <Input
                                    id="businessName"
                                    name="businessName"
                                    placeholder="Digital Agency Corp"
                                    className="h-12 bg-muted/30 border-border/50 rounded-xl px-4"
                                    value={form.businessName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Account Category</Label>
                                <Select
                                    value={form.businessType}
                                    onValueChange={(val) =>
                                        setForm((prev) => ({ ...prev, businessType: val as 'personal' | 'bisnis' }))
                                    }
                                >
                                    <SelectTrigger className="h-12 bg-muted/30 border-border/50 rounded-xl px-4">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card border-border">
                                        <SelectItem value="personal">Personal Brand / Freelancer</SelectItem>
                                        <SelectItem value="bisnis">Business / Enterprise</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-14 rounded-xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all" disabled={loading}>
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Mendaftarkan Akun...
                                </span>
                            ) : 'Konfirmasi Pendaftaran'}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground font-medium pt-2">
                            Sudah memiliki akses?{' '}
                            <Link href="/login" className="text-primary hover:text-primary/80 font-bold underline-offset-4 hover:underline transition-all">
                                Masuk ke Portal
                            </Link>
                        </p>
                    </form>
                </div>

                <div className="flex flex-col items-center gap-4 text-muted-foreground/30 font-bold text-[10px] uppercase tracking-[0.2em]">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-4 h-4" />
                        Enterprise Grade Security
                    </div>
                </div>
            </div>
        </div>
    )
}