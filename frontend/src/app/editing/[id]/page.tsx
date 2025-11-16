import { HydrationBoundary } from '@tanstack/react-query'
import { prefetchPublicationPage } from './prefetch'
import EditPublicationPage from '@/screens/EditPublicationPage'

type PublicationPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PublicationPageProps) {
  const { id } = await params
  const state = await prefetchPublicationPage(id)

  return (
    <HydrationBoundary state={state}>
      <EditPublicationPage />
    </HydrationBoundary>
  )
}
