export const ONBOARDING_STATUS_MAP = {
    PENDING: { 
        label: 'Menunggu Setup', 
        className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' 
    },
    IN_PROGRESS: { 
        label: 'Sedang Disetup', 
        className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' 
    },
    COMPLETED: { 
        label: 'Aktif', 
        className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
    },
} as const;
