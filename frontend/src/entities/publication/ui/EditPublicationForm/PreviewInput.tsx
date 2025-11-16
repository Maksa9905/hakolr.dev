import { Input } from '@/shared/ui'
import { $preview, previewChanged } from '@/entities/publication'
import { useUnit } from 'effector-react'

const PreviewInput = () => {
  const { preview, changePreview } = useUnit({
    preview: $preview,
    changePreview: previewChanged,
  })

  return (
    <Input
      label="Превью"
      placeholder="Tanstack Query (ранее React Query) — это мощная библиотека для управления состоянием данных в React-приложениях. "
      value={preview}
      onChange={(value) => changePreview(value)}
      multiline
    />
  )
}

export default PreviewInput
