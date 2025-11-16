'use client'

import { TagSelect } from '@/shared/ui'
import { usePublicationsListQuery } from '../model/usePublicationsListQuery'
import { useTagsOptions } from '../model/useTagsOptions'

const PublicationsTagsSelect = () => {
  const { query, setQuery } = usePublicationsListQuery()
  const { options } = useTagsOptions()

  return (
    <TagSelect
      label="Теги публикаций"
      multiple
      options={options}
      value={(query.tagIds || []) as string[]}
      onChange={(value) => setQuery({ tagIds: value })}
    />
  )
}

export default PublicationsTagsSelect
