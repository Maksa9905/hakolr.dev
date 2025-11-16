'use client'

import { useQuery } from '@tanstack/react-query'
import {
  PublicationSectionContainer,
  PublicationSectionTitle,
  PublicationSectionParagraph,
} from './PublicationSection.styled'
import { PublicationsController } from '@/entities/publication'
import { useMemo } from 'react'
import { Link } from '@/shared/ui'

type PublicationSectionProps = {
  className?: string
  isEditing?: boolean
  tagIds: string[]
  title: string
  paragraph: string
  size?: number
  id: string
}

const PublicationSection = ({
  className,
  isEditing,
  tagIds,
  title,
  size,
  paragraph,
  id,
}: PublicationSectionProps) => {
  const { data: tags } = useQuery({
    queryKey: ['publications-tags'],
    queryFn: PublicationsController.getPublicationsTags,
  })

  const tagList = useMemo(
    () =>
      tags?.filter((tag) => tagIds.includes(tag.id)).map((tag) => tag.label),
    [tags, tagIds],
  )

  const link = useMemo(
    () => (isEditing ? `/editing/${id}` : `/publications/${id}`),
    [isEditing, id],
  )

  return (
    <PublicationSectionContainer
      className={className}
      component="article"
      title={tagList?.join(' · ') ?? ''}
      $flex={size}
    >
      <PublicationSectionTitle
        $trimmedTo="word"
        component="h3"
      >
        <Link href={link}>{title}</Link>
      </PublicationSectionTitle>
      <PublicationSectionParagraph>{paragraph}</PublicationSectionParagraph>
    </PublicationSectionContainer>
  )
}

export default PublicationSection
