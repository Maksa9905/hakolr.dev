import { ApiController, ApiWithMetaResponse } from '@/shared/api'
import {
  CreatePublicationParams,
  GetPublicationsParams,
  PublicationResponse,
  PublicationStatisticsResponse,
  PublicationTagResponse,
} from './types'
import { cookies } from '@/shared/lib'
import { transofrmPublicationResponse } from '../model/mappers'

export class PublicationsController {
  static async getPublicationsTags() {
    return await ApiController.call<PublicationTagResponse[]>('tags', {
      method: 'GET',
    })
  }

  static async getPublications(params: GetPublicationsParams) {
    const response = await ApiController.call<
      ApiWithMetaResponse<PublicationResponse[]>
    >('posts', {
      method: 'GET',
      params,
    })

    return response
  }

  static async getPublicationStatistics() {
    return await ApiController.call<PublicationStatisticsResponse>(
      'posts/stats',
      {
        method: 'GET',
      },
    )
  }

  static async getPublication(id: string) {
    const response = await ApiController.call<PublicationResponse>(
      `posts/${id}`,
      {
        method: 'GET',
      },
    )

    return transofrmPublicationResponse(response)
  }

  static async updatePublication(id: string, data: CreatePublicationParams) {
    return await ApiController.call<PublicationResponse>(`posts/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${cookies().get('token')}`,
      },
      data,
    })
  }

  static async deletePublication(id: string) {
    return await ApiController.call<PublicationResponse>(`posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${cookies().get('token')}`,
      },
    })
  }

  static async createPublication(data: CreatePublicationParams) {
    return await ApiController.call<PublicationResponse>('posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cookies().get('token')}`,
      },
      data,
    })
  }
}
