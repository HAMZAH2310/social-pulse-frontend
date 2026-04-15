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
            },
        }),
        {
            name: 'auth-storage',
            onRehydrateStorage: (state) => {
                return () => state.setHasHydrated(true)
            },
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                // token removed from persistence for security
            }),
        }
    )
)