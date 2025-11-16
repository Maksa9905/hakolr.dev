'use client'

import { useQuery } from '@tanstack/react-query'
import LatestPublicationCard from './LatestPublicationCard'
import { SectionContainer } from './LatestPublicationSection.styled'
import { PublicationsController } from '@/entities/publication'

const LatestPublicationsSection = () => {
  const { data: statistics } = useQuery({
    queryKey: ['publication-statistics'],
    queryFn: PublicationsController.getPublicationStatistics,
  })

  if (!statistics) {
    return null
  }

  const { latestPosts } = statistics

  return (
    <SectionContainer title="Свежее">
      {latestPosts.map((post) => (
        <LatestPublicationCard
          key={post.id}
          id={post.id}
          title={post.title}
          paragraph={post.paragraph}
          datetime={post.createdAt}
        />
      ))}
    </SectionContainer>
  )
}

export default LatestPublicationsSection
