import { TagSelect } from '@/shared/ui'
import { $tags, tagsChanged, useTagsOptions } from '@/entities/publication'
import { useUnit } from 'effector-react'

const TagsSelect = () => {
  const { tags, changeTags } = useUnit({
    tags: $tags,
    changeTags: tagsChanged,
  })

  const { options } = useTagsOptions()

  return (
    <TagSelect
      label="Теги"
      multiple
      options={options}
      value={tags}
      onChange={changeTags}
    />
  )
}

export default TagsSelect
