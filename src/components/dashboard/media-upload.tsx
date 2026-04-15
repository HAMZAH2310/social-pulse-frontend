'use client'

import { useCallback, useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X, FileVideo, ImageIcon } from 'lucide-react'
import { cn } from "@/lib/utils"

interface MediaUploadProps {
    onFileChange: (file: File | null) => void
    error?: string
}

const MAX_SIZE = 100 * 1024 * 1024
const ACCEPTED = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/webp': ['.webp'],
    'video/mp4': ['.mp4'],
    'video/quicktime': ['.mov'],
}

export default function MediaUpload({ onFileChange, error }: MediaUploadProps) {
    const [preview, setPreview] = useState<string | null>(null)
    const [fileInfo, setFileInfo] = useState<{ name: string; type: string; size: string } | null>(null)

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview)
        }
    }, [preview])

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
        if (rejectedFiles.length > 0) {
            const reason = rejectedFiles[0].errors[0].code
            if (reason === 'file-too-large') {
                alert('File terlalu besar. Maksimal 100MB')
            } else {
                alert('Format file tidak didukung')
            }
            return
        }

        const file = acceptedFiles[0]
        if (!file) return

        const isVideo = file.type.startsWith('video/')
        const sizeInMB = (file.size / (1024 * 1024)).toFixed(2)

        setFileInfo({
            name: file.name,
            type: isVideo ? 'video' : 'image',
            size: `${sizeInMB} MB`,
        })
        if (!isVideo) {
            const objectUrl = URL.createObjectURL(file)
            setPreview(objectUrl)
        } else {
            setPreview(null)
        }

        onFileChange(file)
    }, [onFileChange])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ACCEPTED,
        maxSize: MAX_SIZE,
        maxFiles: 1,
    })

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (preview) URL.revokeObjectURL(preview)
        setPreview(null)
        setFileInfo(null)
        onFileChange(null)
    }

    return (
        <div className="space-y-2">
            <div
                {...getRootProps()}
                className={cn(
                    'relative border-2 border-dashed rounded-[2rem] transition-all duration-300 cursor-pointer overflow-hidden',
                    isDragActive
                        ? 'border-primary bg-primary/5 scale-[0.99]'
                        : 'border-white/5 hover:border-primary/30 bg-muted/20 hover:bg-muted/30',
                    error && 'border-destructive/50',
                    fileInfo && 'border-white/10 bg-muted/10'
                )}
            >
                <input {...getInputProps()} />

                {/* Preview gambar */}
                {preview && (
                    <div className="relative group/preview">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-80 object-cover rounded-[1.8rem] transition-transform duration-700 group-hover/preview:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 rounded-[1.8rem]" />
                        <button
                            onClick={handleRemove}
                            className="absolute top-4 right-4 w-10 h-10 bg-black/60 hover:bg-destructive/80 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all opacity-0 group-hover/preview:opacity-100 active:scale-95"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>
                )}

                {/* Preview video */}
                {fileInfo?.type === 'video' && (
                    <div className="p-8 flex items-center gap-5">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse">
                            <FileVideo className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-base font-bold text-foreground truncate">{fileInfo.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-bold text-muted-foreground uppercase">Video MP4</span>
                                <span className="text-xs text-muted-foreground">{fileInfo.size}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleRemove}
                            className="w-10 h-10 bg-white/5 hover:bg-destructive/10 hover:text-destructive rounded-xl flex items-center justify-center transition-all group"
                        >
                            <X className="w-5 h-5 text-muted-foreground group-hover:text-destructive" />
                        </button>
                    </div>
                )}

                {/* Empty state */}
                {!fileInfo && !preview && (
                    <div className="p-14 flex flex-col items-center justify-center gap-4">
                        <div className="w-20 h-20 bg-muted/50 rounded-[2rem] flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-500">
                            {isDragActive
                                ? <Upload className="w-8 h-8 text-primary animate-bounce" />
                                : <ImageIcon className="w-8 h-8 text-muted-foreground" />
                            }
                        </div>
                        <div className="text-center space-y-1">
                            <p className="text-lg font-bold text-foreground">
                                {isDragActive ? 'Lepaskan sekarang' : 'Upload Media Anda'}
                            </p>
                            <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">
                                Drag & drop file gambar atau video di sini.
                            </p>
                            <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest pt-2">
                                Maksimal 100MB
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    )
}

