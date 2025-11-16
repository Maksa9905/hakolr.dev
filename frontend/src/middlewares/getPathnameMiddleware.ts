import { NextFetchEvent, NextRequest } from 'next/server'
import { MiddlewareFactory } from './stackHandler'

export const getPathnameMiddleware: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname

    const response = await next(request, _next)

    if (response) {
      response.headers.set('x-pathname', pathname)
    }

    return response
  }
}
