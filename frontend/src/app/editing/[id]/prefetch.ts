import { PublicationsController } from '@/entities/publication'
import { dehydrate, QueryClient } from '@tanstack/react-query'

export const prefetchPublicationPage = async (id: string) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['publication', id],
    queryFn: () => PublicationsController.getPublication(id),
  })

  await queryClient.prefetchQuery({
    queryKey: ['publications-tags'],
    queryFn: PublicationsController.getPublicationsTags,
  })

  return dehydrate(queryClient)
}
