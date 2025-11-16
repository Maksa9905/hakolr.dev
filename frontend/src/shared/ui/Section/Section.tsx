import { ReactNode } from 'react'
import {
  SectionContainer,
  SectionContent,
  SectionTitle,
} from './Section.styled'

type SectionProps = {
  title: string
  children: ReactNode
  className?: string
  component?: 'article' | 'section'
}

const Section = ({
  title,
  children,
  className,
  component = 'section',
}: SectionProps) => {
  return (
    <SectionContainer
      className={className}
      as={component}
    >
      <SectionTitle component="h2">{title}</SectionTitle>
      <SectionContent>{children}</SectionContent>
    </SectionContainer>
  )
}

export default Section
