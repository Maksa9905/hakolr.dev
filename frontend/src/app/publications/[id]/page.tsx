import PublicationPage from '@/screens/PublicationPage'
import { HydrationBoundary } from '@tanstack/react-query'
import { prefetchPublicationPage } from './prefetch'
import { PublicationsController } from '@/entities/publication'
import type { Metadata } from 'next'

type PublicationPageProps = {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({
  params,
}: PublicationPageProps): Promise<Metadata> {
  const { id } = await params

  const publication = await PublicationsController.getPublication(id)
  const tags = await PublicationsController.getPublicationsTags()

  const tagLabels = publication.tagIds.map((tagId) =>
    tags.find((tag) => tag?.id === tagId),
  )

  return {
    title: publication.title,
    description: publication.description,
    keywords: tagLabels.join(', '),
  }
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
