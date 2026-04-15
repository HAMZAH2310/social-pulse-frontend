// src/components/dashboard/post-form.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api, getErrorMessage } from '../../lib/api'
import { Post } from '../../types/posts'
import MediaUpload from './media-upload'
import SchedulePicker from './schedule-picker'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Send, Clock, Loader2 } from 'lucide-react'

const MAX_CAPTION = 2200

export default function PostForm() {
    const router = useRouter()

    const [file, setFile] = useState<File | null>(null)
    const [caption, setCaption] = useState('')
    const [scheduledAt, setScheduledAt] = useState<string | undefined>()
    const [error, setError] = useState('')
    const [fieldErrors, setFieldErrors] = useState<{ file?: string; caption?: string }>({})
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const validate = (): boolean => {
        const errors: { file?: string; caption?: string } = {}
        if (!file) errors.file = 'Foto atau video wajib diupload'
        if (!caption.trim()) errors.caption = 'Caption wajib diisi'
        if (caption.length > MAX_CAPTION) errors.caption = `Caption maksimal ${MAX_CAPTION} karakter`
        setFieldErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!validate()) return

        setLoading(true)

        try {
            // Pakai FormData karena ada file upload
            const formData = new FormData()
            formData.append('file', file!)
            formData.append('caption', caption)
            if (scheduledAt) formData.append('scheduledAt', scheduledAt)

            await api.post('posts', { body: formData }).json<{ success: boolean; data: Post }>()

            setSuccess(true)

            // Reset form
            setFile(null)
            setCaption('')
            setScheduledAt(undefined)
            setFieldErrors({})

            // Redirect ke list post setelah 1.5 detik
            setTimeout(() => router.push('/dashboard/posts'), 1500)
        } catch (err) {
            setError(await getErrorMessage(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {error && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert className="bg-green-500/10 border-green-500/20">
                    <AlertDescription className="text-green-400">
                        ✓ Post berhasil {scheduledAt ? 'dijadwalkan' : 'dibuat'}! Mengalihkan...
                    </AlertDescription>
                </Alert>
            )}

            {/* Upload media */}
            <div className="space-y-3">
                <Label className="text-sm font-bold text-foreground">Konten Visual</Label>
                <MediaUpload
                    onFileChange={setFile}
                    error={fieldErrors.file}
                />
            </div>

            {/* Caption */}
            <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                    <Label className="text-sm font-bold text-foreground">Caption Post</Label>
                    <span className={`text-xs ${caption.length > MAX_CAPTION ? 'text-red-400' : 'text-neutral-500'}`}>
                        {caption.length}/{MAX_CAPTION}
                    </span>
                </div>
                <Textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Tulis caption post kamu di sini..."
                    rows={6}
                    className="bg-muted/30 border-white/5 text-foreground placeholder:text-muted-foreground/50 resize-none focus:border-primary/50 focus:ring-primary/20 rounded-2xl p-4 transition-all"
                />
                {fieldErrors.caption && (
                    <p className="text-xs text-red-400">{fieldErrors.caption}</p>
                )}
            </div>

            {/* Jadwal */}
            <div className="space-y-3">
                <Label className="text-sm font-bold text-foreground">
                    Jadwal Post{' '}
                    <span className="text-muted-foreground font-normal ml-1">(Opsional)</span>
                </Label>
                <SchedulePicker value={scheduledAt} onChange={setScheduledAt} />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                    type="submit"
                    disabled={loading || success}
                    className="flex-1 h-12 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                >
                    {loading ? (
                        <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> Mengupload...</>
                    ) : scheduledAt ? (
                        <><Clock className="w-5 h-5 mr-3" /> Jadwalkan Post</>
                    ) : (
                        <><Send className="w-5 h-5 mr-3" /> Buat Post Sekarang</>
                    )}
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={loading}
                    className="h-12 px-8 rounded-2xl border-white/5 text-muted-foreground hover:text-foreground hover:bg-white/5 font-semibold transition-all"
                >
                    Batal
                </Button>
            </div>
        </form>
    )
}