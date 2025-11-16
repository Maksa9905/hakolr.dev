'use client'

import { EditPublicationForm } from '@/entities/publication'
import { Header } from '@/widgets/header'
import { PageContainer } from '@/widgets/page-container'

const EditPublicationPage = () => {
  return (
    <>
      <Header
        title="Изменить публикацию"
        description="Здесь вы можете изменить публикацию"
      />
      <PageContainer>
        <EditPublicationForm />
      </PageContainer>
    </>
  )
}

export default EditPublicationPage
