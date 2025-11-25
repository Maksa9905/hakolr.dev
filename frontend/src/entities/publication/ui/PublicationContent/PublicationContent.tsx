'use client'

import { PublicationContentContainer } from './PublicationContent.styled'

type PublicationContentProps = {
  content: React.ReactNode
}

const PublicationContent = ({ content }: PublicationContentProps) => {
  return <PublicationContentContainer>{content}</PublicationContentContainer>
}

export default PublicationContent
