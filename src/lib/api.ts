// src/lib/api.ts
import ky, { HTTPError } from 'ky'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export const api = ky.create({
    prefix: `${API_URL}/api`,
    timeout: 30000,
    retry: {
        limit: 2,
        methods: ['get'],
        statusCodes: [408, 502, 503, 504],
    },
    hooks: {
        beforeRequest: [
            ({ request }) => {
                if (typeof window !== 'undefined') {
                    const token = localStorage.getItem('token')
                    if (token) {
                        request.headers.set('Authorization', `Bearer ${token}`)
                    }
                }
            },
        ],
        afterResponse: [
            async ({ request, options, response }) => {
                if (response.status === 401 && typeof window !== 'undefined') {
                    localStorage.removeItem('token')
                    window.location.href = '/login'
                }
                return response
            },
        ],
    },
})

export const getErrorMessage = async (error: unknown): Promise<string> => {
    if (error instanceof HTTPError) {
        try {
            const body = await error.response.json() as { message: string }
            return body.message || 'Terjadi kesalahan'
        } catch {
            return 'Terjadi kesalahan pada server'
        }
    }
    if (error instanceof Error) return error.message
    return 'Terjadi kesalahan'
}