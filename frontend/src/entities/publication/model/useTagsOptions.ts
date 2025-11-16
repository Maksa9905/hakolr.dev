'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { PublicationsController } from '../api/api'

export const useTagsOptions = () => {
  const { data: tags } = useQuery({
    queryKey: ['publications-tags'],
    queryFn: PublicationsController.getPublicationsTags,
  })

  const options = useMemo(() => {
    return tags?.filter((tag) => !tag.isMostPopular && !tag.isMostLiked) || []
  }, [tags])

  return { tags, options }
}
