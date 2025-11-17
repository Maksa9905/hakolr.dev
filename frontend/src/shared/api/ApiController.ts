import axios, { AxiosError, AxiosRequestConfig } from 'axios'

// Определяем URL для API запросов
// На сервере (SSR) используем внутренний Docker URL
// На клиенте используем относительный путь (через Nginx)
const BASE_URL =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_API_URL_INTERNAL || 'http://backend:3001/api'
    : process.env.NEXT_PUBLIC_API_URL || '/api'

function serializeError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError
    const serializedError = new Error(
      axiosError.message || 'Request failed',
    ) as Error & { status?: number; statusText?: string; data?: unknown }

    serializedError.name = axiosError.name || 'AxiosError'
    serializedError.status = axiosError.response?.status
    serializedError.statusText = axiosError.response?.statusText
    serializedError.data = axiosError.response?.data

    return serializedError
  }

  if (error instanceof Error) {
    return error
  }

  return new Error(String(error))
}

export class ApiController {
  static async call<T>(url: string, config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await axios.request<T>({
        url: `${BASE_URL}/${url}`,
        ...config,
      })

      if (!response.status) throw new Error('Failed to fetch data')

      return response.data
    } catch (error) {
      throw serializeError(error)
    }
  }
}
