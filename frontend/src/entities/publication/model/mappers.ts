import { PublicationsListQueryParams } from './types'

export const mapPublicationParams = (params: PublicationsListQueryParams) => {
  return {
    tagIds: params.tagIds
      ? Array.isArray(params.tagIds)
        ? params.tagIds.join(',')
        : params.tagIds
      : '',
    search: params.search ?? '',
    page: params.page ?? 1,
    limit: params.limit ?? 10,
  }
}
