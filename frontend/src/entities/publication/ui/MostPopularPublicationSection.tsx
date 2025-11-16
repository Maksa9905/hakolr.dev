'use client'

import { PublicationSection } from '@/widgets/publications'
import { useQuery } from '@tanstack/react-query'
import { PublicationsController } from '../api/api'
import { useMemo } from 'react'

const MostPopularPublicationSection = () => {
  const { data: tags } = useQuery({
    queryKey: ['publications-tags'],
    queryFn: PublicationsController.getPublicationsTags,
  })

  const { data: statistics } = useQuery({
    queryKey: ['publication-statistics'],
    queryFn: PublicationsController.getPublicationStatistics,
  })

  const mostPopularTags = useMemo(() => {
    if (!tags) return []
    return tags.filter((tag) => tag.isMostPopular).map((tag) => tag.id)
  }, [tags])

  if (!statistics) {
    return null
  }

  const { mostPopularPost } = statistics

  return (
    <PublicationSection
      id={mostPopularPost.id}
      tagIds={mostPopularTags}
      size={5}
      title={mostPopularPost.title}
      paragraph={mostPopularPost.paragraph}
    />
  )
}

export default MostPopularPublicationSection
