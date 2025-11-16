import EditPublicationsPage from '@/screens/EditPublicationsPage'
import { prefetchEditingPage } from './prefetch'
import { HydrationBoundary } from '@tanstack/react-query'
import { dehydrate } from '@tanstack/react-query'
import { PublicationsListQueryParams } from '@/entities/publication'

type PageProps = {
  searchParams: Promise<PublicationsListQueryParams>
}

export default async function Page({ searchParams }: PageProps) {
  const queryClient = await prefetchEditingPage(await searchParams)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditPublicationsPage />
    </HydrationBoundary>
  )
}
