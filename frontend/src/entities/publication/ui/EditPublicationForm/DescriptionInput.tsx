import { Input } from '@/shared/ui'
import { $description, descriptionChanged } from '@/entities/publication'
import { useUnit } from 'effector-react'

const DescriptionInput = () => {
  const { description, changeDescription } = useUnit({
    description: $description,
    changeDescription: descriptionChanged,
  })

  return (
    <Input
      label="Описание"
      placeholder="Введите описание"
      value={description}
      onChange={changeDescription}
    />
  )
}

export default DescriptionInput
