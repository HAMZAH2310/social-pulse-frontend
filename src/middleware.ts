import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ['/login', '/register'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    if (!token && !AUTH_ROUTES.includes(pathname)) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        url.searchParams.set('redirect', pathname)
        return NextResponse.redirect(url)
    }

    if (token && AUTH_ROUTES.includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|css|js|map|ico|json|webmanifest|woff2|woff|ttf)$).*)']
}