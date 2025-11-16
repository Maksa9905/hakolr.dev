import PublicationsPage from '@/screens/PublicationsPage'
import { dehydrate } from '@tanstack/react-query'
import { HydrationBoundary } from '@tanstack/react-query'
import { prefetchPublicationsPage } from './prefetch'
import {
  PublicationsController,
  PublicationsListQueryParams,
  mapPublicationParams,
} from '@/entities/publication'

type PageProps = {
  searchParams: Promise<PublicationsListQueryParams>
}

export async function generateMetadata({ searchParams }: PageProps) {
  const params = await searchParams
  const publications = await PublicationsController.getPublications(
    mapPublicationParams(params),
  )

  const publicationsTitles = publications.data.map(
    (publication) => publication.title,
  )

  return {
    title: 'Публикации',
    description: 'Публикации',
    keywords: publicationsTitles.join(', '),
  }
}

export default async function Page({ searchParams }: PageProps) {
  const queryClient = await prefetchPublicationsPage(await searchParams)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PublicationsPage />
    </HydrationBoundary>
  )
}
