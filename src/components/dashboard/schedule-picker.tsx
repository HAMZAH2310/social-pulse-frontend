'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { CalendarIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface SchedulePickerProps {
    value: string | undefined
    onChange: (value: string | undefined) => void
}

export default function SchedulePicker({ value, onChange }: SchedulePickerProps) {
    const [open, setOpen] = useState(false)
    const selectedDate = value ? new Date(value) : undefined

    const handleDateSelect = (date: Date | undefined) => {
        if (!date) return
        
        const newDate = new Date(date)
        // Pertahankan time jika sudah ada, default 09:00
        const current = value ? new Date(value) : null
        const hours = current ? current.getHours() : 9
        const minutes = current ? current.getMinutes() : 0
        newDate.setHours(hours, minutes, 0, 0)
        onChange(newDate.toISOString())
        setOpen(false)
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedDate) return
        const [hours, minutes] = e.target.value.split(':').map(Number)
        const date = new Date(selectedDate)
        date.setHours(hours, minutes, 0, 0)
        onChange(date.toISOString())
    }

    const handleClear = () => onChange(undefined)

    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                {/* Date picker */}
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                                'flex-1 h-11 justify-start text-left font-medium bg-muted/20 border-white/5 hover:bg-muted/30 hover:border-primary/30 rounded-xl transition-all',
                                !selectedDate && 'text-muted-foreground'
                            )}
                        >
                            <CalendarIcon className="mr-3 h-4 w-4 text-primary" />
                            {selectedDate
                                ? format(selectedDate, 'dd MMMM yyyy', { locale: id })
                                : 'Pilih tanggal jadwal'
                            }
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto p-0 bg-card border-white/10 rounded-2xl shadow-2xl shadow-black"
                        align="start"
                    >
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            disabled={(date) => {
                                const today = new Date()
                                today.setHours(0, 0, 0, 0)
                                return date < today
                            }}
                            className="p-3"
                        />
                    </PopoverContent>
                </Popover>

                {/* Time picker */}
                {selectedDate && (
                    <Input
                        type="time"
                        value={selectedDate ? format(selectedDate, 'HH:mm') : '09:00'}
                        onChange={handleTimeChange}
                        className="w-32 h-11 bg-muted/20 border-white/5 text-foreground rounded-xl focus:ring-primary/20 focus:border-primary/50"
                    />
                )}

                {/* Clear */}
                {selectedDate && (
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleClear}
                        className="h-11 w-11 bg-muted/20 border-white/5 hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive rounded-xl transition-all"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {selectedDate && (
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    Post akan dikirim pada{' '}
                    <span className="text-primary font-bold">
                        {format(selectedDate, "EEEE, dd MMMM yyyy 'pukul' HH:mm", { locale: id })}
                    </span>
                </p>
            )}
        </div>
    )
}