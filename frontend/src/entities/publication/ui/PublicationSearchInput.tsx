'use client'

import { DebouncedInput } from '@/shared/ui'
import { usePublicationsListQuery } from '../model/usePublicationsListQuery'

type PublicationSearchInputProps = {
  className?: string
}

const PublicationSearchInput = ({ className }: PublicationSearchInputProps) => {
  const { query, setQuery } = usePublicationsListQuery()

  return (
    <DebouncedInput
      className={className}
      label="Поиск"
      placeholder="Best Practice создания кастомных алертов"
      value={query.search ?? ''}
      onChange={(value) => setQuery({ search: value || undefined })}
    />
  )
}

export default PublicationSearchInput
