'use client'

import { Header } from '@/widgets/header'
import { PageContainer } from '@/widgets/page-container'
import {
  PublicationsList,
  LatestPublicationsSection,
} from '@/widgets/publications'
import {
  PopularPublicationSection,
  StyledPublicationsFilters,
} from './PublicationsPage.styled'
import {
  MostLikedPublicationSection,
  MostPopularPublicationSection,
  usePublicationsListQuery,
} from '@/entities/publication'
import { useMemo } from 'react'

const PublicationsPage = () => {
  const { query } = usePublicationsListQuery()

  const showPopularPublications = useMemo(() => {
    return !query.search && query.tagIds?.length === 0
  }, [query.search, query.tagIds])

  return (
    <>
      <Header
        title="Публикации"
        description="Мои публикации"
      />
      <PageContainer>
        <StyledPublicationsFilters />
        {showPopularPublications && (
          <PopularPublicationSection>
            <LatestPublicationsSection />
            <MostPopularPublicationSection />
            <MostLikedPublicationSection />
          </PopularPublicationSection>
        )}
        <PublicationsList />
      </PageContainer>
    </>
  )
}

export default PublicationsPage
