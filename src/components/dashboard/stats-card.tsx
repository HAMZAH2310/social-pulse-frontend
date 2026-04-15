import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
    title: string
    value: string | number
    description?: string
    icon: LucideIcon
    trend?: 'up' | 'down' | 'neutral'
    trendValue?: string
    iconColor?: string
    className?: string
}

const TREND_CONFIG = {
    up: {
        className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        symbol: '↑'
    },
    down: {
        className: 'bg-red-500/10 text-red-500 border-red-500/20',
        symbol: '↓'
    },
    neutral: {
        className: 'bg-muted/50 text-muted-foreground border-border',
        symbol: '•'
    }
}

export default function StatsCard({
    title,
    value,
    description,
    icon: Icon,
    trend = 'neutral',
    trendValue,
    iconColor = 'text-primary',
    className,
}: StatsCardProps) {
    const trendStyle = TREND_CONFIG[trend] || TREND_CONFIG.neutral

    return (
        <div className={cn(
            "glass-card rounded-2xl p-6 space-y-4 hover:border-white/10 transition-all duration-300 group shadow-lg",
            className
        )}>
            <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest leading-none">{title}</span>
                <div className={cn(
                    'w-10 h-10 rounded-xl bg-muted/30 border border-white/5 flex items-center justify-center transition-transform group-hover:scale-110',
                    iconColor
                )}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>

            <div className="space-y-1">
                <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
                {description && (
                    <p className="text-xs text-muted-foreground/80 font-medium">{description}</p>
                )}
            </div>

            {trendValue && (
                <div className={cn(
                    'flex items-center gap-1.5 px-3 py-1 rounded-full w-fit text-[10px] font-bold uppercase tracking-wider border',
                    trendStyle.className
                )}>
                    {trendStyle.symbol} {trendValue}
                </div>
            )}
        </div>
    )
}