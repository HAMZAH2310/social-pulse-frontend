'use client'

import PostForm from '@/src/components/dashboard/post-form'
import { ArrowLeft, Sparkles, Send } from 'lucide-react'
import Link from 'next/link'

export default function CreatePostPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <Link
                        href="/dashboard"
                        className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h2 className="text-3xl font-bold text-foreground tracking-tight">Buat Post</h2>
                            <div className="px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-wider">
                                New Draft
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium"> Upload media dan atur jadwal tayang otomatis </p>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">3 Anggota Tim Aktif</span>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Form Side */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-violet-500/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                        <div className="relative glass-card rounded-[2rem] p-8 md:p-10 border-white/10 overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Send className="w-32 h-32 text-primary rotate-12" />
                            </div>

                            <div className="relative">
                                <PostForm />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tips Side */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="glass-card rounded-3xl p-6 border-primary/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="font-bold text-foreground">Tips Pro</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "Gunakan gambar rasio 4:5 untuk engagement maksimal di Instagram.",
                                "Posting di jam 18:00 - 20:00 adalah waktu emas untuk audiens Indonesia.",
                                "Sertakan 3-5 hashtag relevan di kolom caption.",
                            ].map((tip, idx) => (
                                <li key={idx} className="flex gap-3">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                    <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
