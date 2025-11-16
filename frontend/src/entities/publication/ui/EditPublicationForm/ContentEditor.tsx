import { MDXEditor } from '@/shared/ui'
import { $content, contentChanged } from '@/entities/publication'
import { useUnit } from 'effector-react'

export const ContentEditor = () => {
  const { content, changeContent } = useUnit({
    content: $content,
    changeContent: contentChanged,
  })

  return (
    <MDXEditor
      markdown={content}
      label="Контент"
      onChange={(markdown) => changeContent(markdown)}
    />
  )
}
