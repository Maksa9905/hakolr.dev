'use client'

import { Button } from '@/shared/ui'
import {
  ButtonsContainer,
  EditPublicationFormContainer,
} from './EditPublicationForm.styled'
import {
  $description,
  $preview,
  $tags,
  $title,
  publicationDataInitialized,
  PublicationsController,
} from '@/entities/publication'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useRef } from 'react'
import { useParams } from 'next/navigation'
import TitleInput from './TitleInput'
import PreviewInput from './PreviewInput'
import DescriptionInput from './DescriptionInput'
import TagsSelect from './TagsSelect'
import { useRouter } from 'next/navigation'
import { MDXEditorMethods } from '@mdxeditor/editor'
import ForwardRefEditor from '@/shared/ui/MDXEditor'

export const EditPublicationForm = () => {
  const isInitialized = useRef(false)
  const contentEditorRef = useRef<MDXEditorMethods>(null)

  const router = useRouter()
  const { id } = useParams()

  const isNew = useMemo(() => id === 'new', [id])

  const { data: publication } = useQuery({
    queryKey: ['publication', id],
    queryFn: () => PublicationsController.getPublication(id as string),
    enabled: !isNew,
  })

  useMemo(() => {
    if (publication && !isInitialized.current) {
      publicationDataInitialized({
        title: publication.title,
        description: publication.description,
        preview: publication.paragraph,
        tags: publication.tagIds,
      })
      contentEditorRef.current?.setMarkdown(publication.content)
      isInitialized.current = true
    }
  }, [publication])

  const handleSubmitForm = useCallback(() => {
    if (isNew) {
      PublicationsController.createPublication({
        title: $title.getState(),
        description: $description.getState(),
        paragraph: $preview.getState(),
        content: contentEditorRef.current?.getMarkdown() || '',
        tagIds: $tags.getState(),
      })

      return router.push('/editing')
    }

    PublicationsController.updatePublication(id as string, {
      title: $title.getState(),
      description: $description.getState(),
      paragraph: $preview.getState(),
      content: contentEditorRef.current?.getMarkdown() || '',
      tagIds: $tags.getState(),
    })

    router.push('/editing')
  }, [id, isNew, router])

  const handleDeletePublication = useCallback(() => {
    PublicationsController.deletePublication(id as string)
  }, [id])

  return (
    <EditPublicationFormContainer>
      <TagsSelect />
      <TitleInput />
      <PreviewInput />
      <DescriptionInput />
      <ForwardRefEditor
        label="Контент"
        markdown={publication?.content || ''}
        ref={contentEditorRef}
      />
      <ButtonsContainer $isNew={isNew}>
        <Button onClick={handleSubmitForm}>
          {isNew ? 'Создать' : 'Изменить'}
        </Button>
        {!isNew && (
          <Button
            onClick={handleDeletePublication}
            variant="outlined"
          >
            Удалить
          </Button>
        )}
      </ButtonsContainer>
    </EditPublicationFormContainer>
  )
}
