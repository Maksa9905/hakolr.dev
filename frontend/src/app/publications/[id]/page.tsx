import PublicationPage from '@/screens/PublicationPage'
import { HydrationBoundary } from '@tanstack/react-query'
import { prefetchPublicationPage } from './prefetch'

type PublicationPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PublicationPageProps) {
  const { id } = await params
  const state = await prefetchPublicationPage(id)

  return (
    <>
      <HydrationBoundary state={state}>
        <PublicationPage />
      </HydrationBoundary>
    </>
  )
}
