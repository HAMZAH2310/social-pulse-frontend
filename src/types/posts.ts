export type PostStatus = 'PENDING' | 'SCHEDULED' | 'POSTED' | 'FAILED'

export interface Post {
    id: string
    caption: string
    imageUrl: string
    imagePublicId: string
    status: PostStatus
    scheduledAt: string | null
    externalPostId: string | null
    errorMessage: string | null
    createdAt: string
    updatedAt: string
    projectId: string
}

export interface CreatePostPayload {
    caption: string
    scheduledAt?: string
}