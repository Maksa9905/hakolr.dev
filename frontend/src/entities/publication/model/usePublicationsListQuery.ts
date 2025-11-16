'use client'

import { QueryParamType, useQueryParams } from '@/shared/hooks'
import { PublicationsListQueryParams } from './types'

export const usePublicationsListQuery = () => {
  const [query, setQuery] = useQueryParams({
    tagIds: {
      type: QueryParamType.ARRAY,
      defaultValue: [],
    },
    search: {
      type: QueryParamType.STRING,
      defaultValue: '',
    },
    page: {
      type: QueryParamType.NUMBER,
      defaultValue: 1,
    },
    limit: {
      type: QueryParamType.NUMBER,
      defaultValue: 10,
    },
  })

  return {
    query: {
      tagIds: Array.isArray(query.tagIds) ? query.tagIds : [query.tagIds],
      search: query.search,
      page: query.page,
      limit: query.limit,
    } as PublicationsListQueryParams,
    setQuery,
  }
}
