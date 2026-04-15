import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../types/auth'

interface AuthState {
    token: string | null
    user: User | null
    isAuthenticated: boolean
    _hasHydrated: boolean
    setHasHydrated: (state: boolean) => void
    setAuth: (token: string, user: User) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            _hasHydrated: false,
            setHasHydrated: (state) => set({ _hasHydrated: state }),

            setAuth: (token, user) => {
                set({ token, user, isAuthenticated: true })
            },

            logout: () => {
                set({ token: null, user: null, isAuthenticated: false })
                if (typeof window !== 'undefined') {
                    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
                }
            },
        }),
        {
            name: 'auth-storage',
            onRehydrateStorage: () => (state, error) => {
                if (!error && state) {
                    state.setHasHydrated(true)
                }
            },
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                // token removed from persistence for security
            }),
        }
    )
)