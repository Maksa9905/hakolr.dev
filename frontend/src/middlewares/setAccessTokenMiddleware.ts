import { jwtVerify } from 'jose'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { MiddlewareFactory } from './stackHandler'

export const setAccessTokenMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname

    // Исключаем статические ресурсы и API роуты
    if (
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/api/') ||
      pathname.startsWith('/fonts/') ||
      pathname.includes('.') // файлы с расширениями (favicon.ico, photo.jpg, etc.)
    ) {
      return next(request, _next)
    }

    // Получаем токен из query параметров
    const url = new URL(request.url)
    const searchParams = url.searchParams
    const token = searchParams.get('access')

    // Если токена нет в query, передаем управление дальше
    if (!token) {
      return next(request, _next)
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET as string)

      // Проверяем валидность токена
      await jwtVerify(token, secret)

      // Создаем response и сохраняем токен в cookies
      const response = NextResponse.next()
      response.cookies.set('token', token, {
        httpOnly: false,
        secure: false, // Изменится на true когда настроите SSL
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })

      // Сохраняем признак авторизации
      response.cookies.set('isAuthorized', 'true', {
        httpOnly: false, // Доступно в JS
        secure: false, // Изменится на true когда настроите SSL
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })

      return response
    } catch {
      // Если токен невалидный, просто передаем управление дальше
      return next(request, _next)
    }
  }
}
