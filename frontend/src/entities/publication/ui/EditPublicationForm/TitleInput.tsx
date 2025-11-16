import { Input } from '@/shared/ui'
import { titleChanged, $title } from '@/entities/publication'
import { useUnit } from 'effector-react'

const TitleInput = () => {
  const { title, changeTitle } = useUnit({
    title: $title,
    changeTitle: titleChanged,
  })

  return (
    <Input
      label="Заголовок"
      placeholder="Все про Tanstack Query"
      value={title}
      onChange={changeTitle}
    />
  )
}

export default TitleInput
