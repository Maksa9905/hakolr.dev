'use client'

import { PublicationSection } from '@/widgets/publications'
import { PublicationsController } from '../api/api'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

const MostLikedPublicationSection = () => {
  const { data: tags } = useQuery({
    queryKey: ['publications-tags'],
    queryFn: PublicationsController.getPublicationsTags,
  })

  const { data: statistics } = useQuery({
    queryKey: ['publication-statistics'],
    queryFn: PublicationsController.getPublicationStatistics,
  })

  const mostLikedTags = useMemo(() => {
    if (!tags) return []
    return tags.filter((tag) => tag.isMostLiked).map((tag) => tag.id)
  }, [tags])

  if (!statistics) {
    return null
  }

  const { mostLikedPost } = statistics

  return (
    <PublicationSection
      id={mostLikedPost.id}
      tagIds={mostLikedTags}
      size={5}
      title={mostLikedPost.title}
      paragraph={mostLikedPost.paragraph}
    />
  )
}

export default MostLikedPublicationSection
