'use client'

import {
  PublicationContent,
  PublicationsController,
} from '@/entities/publication'
import { Header } from '@/widgets/header'
import { PageContainer } from '@/widgets/page-container'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

const PublicationPage = () => {
  const { id } = useParams()

  const { data: publication } = useQuery({
    queryKey: ['publication', id],
    queryFn: () => PublicationsController.getPublication(id as string),
  })

  if (!publication) {
    return null
  }

  return (
    <>
      <Header
        title={publication.title}
        description={publication.description}
      />
      <PageContainer>
        <PublicationContent content={publication.content} />
      </PageContainer>
    </>
  )
}

export default PublicationPage
