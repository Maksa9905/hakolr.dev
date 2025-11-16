'use client'

import { Button } from '@/shared/ui'
import { Header } from '@/widgets/header'
import { PageContainer } from '@/widgets/page-container'
import { PublicationsFilters, PublicationsList } from '@/widgets/publications'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

const EditPublicationsPage = () => {
  const router = useRouter()

  const handleCreatePublication = useCallback(() => {
    router.push('/editing/new')
  }, [router])

  return (
    <>
      <Header
        title="Редактирование публикаций"
        description="Здесь вы можете редактировать свои публикации"
      />
      <PageContainer>
        <PublicationsFilters />
        <Button onClick={handleCreatePublication}>Создать публикацию</Button>
        <PublicationsList isEditing />
      </PageContainer>
    </>
  )
}

export default EditPublicationsPage
