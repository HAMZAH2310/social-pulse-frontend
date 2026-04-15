export interface User {
    id: string
    email: string
    fullName: string | null
    businessName: string | null
    whatsappNumber: string | null
    onboardingStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
}

export interface AuthResponse {
    success: boolean
    data: {
        token: string
        user: User
    }
}

export interface RegisterPayload {
    email: string
    password: string
    fullName: string
    whatsappNumber: string
    businessName: string
    businessType: 'personal' | 'bisnis'
}

export interface LoginPayload {
    email: string
    password: string
}