// src/lib/api.ts
import ky, { HTTPError } from 'ky'

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
            async ({ response }) => {
                if (response.status === 401 && typeof window !== 'undefined') {
                    // Logic to clear ephemeral store state is usually handled by the component catching the error
                    // or we can use the store directly here if needed.
                    // For now, we remove the localStorage calls as requested.
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