import Link from 'next/link'
import { Zap, ArrowRight, Shield, Globe, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />

      {/* Nav Placeholder */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">SocialPulse</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">Masuk</Link>
            <Link href="/register">
              <Button size="sm" className="rounded-full px-6 font-bold">Daftar Sekarang</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10">
        <div className="space-y-12 max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-bounce">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Automasi Sosial Media Terbaik</span>
          </div>

          {/* Hero */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-foreground">
              Automasi Posting <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary bg-[length:200%_auto] animate-gradient">
                Tanpa Batas
              </span>
            </h1>
            <p className="max-w-xl mx-auto text-lg text-muted-foreground font-medium leading-relaxed">
              Platform premium untuk menjadwalkan dan mengelola konten sosial media Anda 
              secara cerdas, aman, dan efisien.
            </p>
          </div>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button className="h-14 px-8 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 group">
                Mulai Sekarang <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="h-14 px-8 rounded-2xl text-lg font-bold border-white/10 hover:bg-muted/50">
                Akses Dashboard
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/5 opacity-50">
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Enterprise Security</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Global Connection</span>
            </div>
            <div className="hidden md:flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Instant Sync</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.3em]">
        SocialPulse Technology &copy; {new Date().getFullYear()} — All Rights Reserved
      </footer>
    </div>
  )
}

