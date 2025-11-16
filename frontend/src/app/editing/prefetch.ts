import {
  mapPublicationParams,
  PublicationsController,
  PublicationsListQueryParams,
} from '@/entities/publication'
import { QueryClient } from '@tanstack/react-query'

export const prefetchEditingPage = async (
  params: PublicationsListQueryParams,
) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['publications-tags'],
    queryFn: PublicationsController.getPublicationsTags,
  })

  await queryClient.prefetchQuery({
    queryKey: ['publications', mapPublicationParams(params)],
    queryFn: () =>
      PublicationsController.getPublications(mapPublicationParams(params)),
  })

  await queryClient.prefetchQuery({
    queryKey: ['publication-statistics'],
    queryFn: PublicationsController.getPublicationStatistics,
  })

  return queryClient
}
