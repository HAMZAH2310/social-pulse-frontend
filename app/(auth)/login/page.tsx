// src/app/(auth)/login/page.tsx
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function LoginPage() {
    const router = useRouter()
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

            // Redirect berdasarkan role
            if (res.data.user.onboardingStatus === 'COMPLETED') {
                router.push('/dashboard')
            } else {
                router.push('/onboarding')  // halaman waiting setup admin
            }
        } catch (err) {
            setError(await getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Masuk</CardTitle>
                    <CardDescription>Masuk ke akun SocialPulse kamu</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

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
                                placeholder="Password kamu"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Masuk...' : 'Masuk'}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Belum punya akun?{' '}
                            <Link href="/register" className="text-primary hover:underline font-medium">
                                Daftar di sini
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}