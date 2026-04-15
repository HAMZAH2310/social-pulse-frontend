// src/lib/api.ts
import ky, { HTTPError } from 'ky'
import { useAuthStore } from '@/src/stores/auth.store'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export const api = ky.create({
    prefix: `${API_URL}/api`,
    timeout: 30000,
    credentials: 'include',
    retry: {
        limit: 2,
        methods: ['get'],
        statusCodes: [408, 502, 503, 504],
    },
    hooks: {
        afterResponse: [
            async (request, options, response) => {
                if (response.status === 401 && typeof window !== 'undefined') {
                    useAuthStore.getState().logout();
                    
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login'
                    }
                }
                return response
            },
        ],
    },
})

export const getErrorMessage = async (error: unknown): Promise<string> => {
    if (error instanceof HTTPError) {
        const data = error.data as { message?: unknown } | undefined
        if (typeof data?.message === 'string' && data.message.trim() !== '') {
            return data.message
        }
        return 'Terjadi kesalahan pada server'
    }
    if (error instanceof Error) return error.message
    return 'Terjadi kesalahan'
}