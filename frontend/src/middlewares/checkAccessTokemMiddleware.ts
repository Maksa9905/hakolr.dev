import { jwtVerify } from 'jose'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { MiddlewareFactory } from './stackHandler'

export const checkAccessTokenMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname

    // Проверяем только страницу редактиров
    // ания
    if (pathname.startsWith('/editing')) {
      const token = request.cookies.get('token')?.value

      if (!token) {
        return NextResponse.redirect(new URL('/', request.url))
      }

      try {
        const secret = new TextEncoder().encode(
          process.env.JWT_SECRET as string,
        )
        await jwtVerify(token, secret)
      } catch {
        // Создаем response с редиректом
        const response = NextResponse.redirect(new URL('/', request.url))

        // Очищаем токен из cookies
        response.cookies.delete('token')
        response.cookies.delete('isAuthorized')

        return response
      }
    }

    // Передаем управление следующей middleware
    return next(request, _next)
  }
}
