import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../types/auth'

interface AuthState {
    token: string | null
    user: User | null
    isAuthenticated: boolean
    setAuth: (token: string, user: User) => void
    logout: () => void
}

const setCookie = (name: string, value: string, days = 7) => {
    const expires = new Date(Date.now() + days * 86400000).toUTCString()
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Strict`
}

const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,

            setAuth: (token, user) => {
                localStorage.setItem('token', token)
                setCookie('token', token)
                set({ token, user, isAuthenticated: true })
            },

            logout: () => {
                localStorage.removeItem('token')
                deleteCookie('token')
                set({ token: null, user: null, isAuthenticated: false })
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                token: state.token,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
)