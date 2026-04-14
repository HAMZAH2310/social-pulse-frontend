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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Daftar Akun</CardTitle>
                    <CardDescription>
                        Isi data bisnis kamu untuk mulai menggunakan SocialPulse
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="fullName">Nama Lengkap</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                placeholder="Budi Santoso"
                                value={form.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="budi@gmail.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Minimal 8 karakter"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="whatsappNumber">Nomor WhatsApp</Label>
                            <Input
                                id="whatsappNumber"
                                name="whatsappNumber"
                                placeholder="081234567890"
                                value={form.whatsappNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="businessName">Nama Bisnis</Label>
                            <Input
                                id="businessName"
                                name="businessName"
                                placeholder="Toko Budi Official"
                                value={form.businessName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Tipe Bisnis</Label>
                            <Select
                                value={form.businessType}
                                onValueChange={(val) =>
                                    setForm((prev) => ({ ...prev, businessType: val as 'personal' | 'bisnis' }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="personal">Personal Brand / Freelancer</SelectItem>
                                    <SelectItem value="bisnis">Bisnis / UMKM</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Sudah punya akun?{' '}
                            <Link href="/login" className="text-primary hover:underline font-medium">
                                Masuk di sini
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}