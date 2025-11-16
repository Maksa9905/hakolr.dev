import { PublicationsController } from '@/entities/publication'
import { QueryClient } from '@tanstack/react-query'

export const prefetchMainPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['publications-tags'],
    queryFn: PublicationsController.getPublicationsTags,
  })

  await queryClient.prefetchQuery({
    queryKey: ['publication-statistics'],
    queryFn: PublicationsController.getPublicationStatistics,
  })

  return queryClient
}
