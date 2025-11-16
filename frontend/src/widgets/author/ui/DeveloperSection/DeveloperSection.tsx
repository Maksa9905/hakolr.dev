'use client'

import { InfoTitle } from '@/shared/ui'
import {
  Container,
  DeveloperInfo,
  SkillsTypography,
} from './DeveloperSection.styled'

const DeveloperSection = () => {
  return (
    <Container title="Разработка">
      <DeveloperInfo>
        <InfoTitle
          value="1 год"
          label="коммерческого опыта во фронте"
        />
        <InfoTitle
          value="1.5 года"
          label="опыта во фронте вцелом"
        />
      </DeveloperInfo>
      <SkillsTypography $trimmedTo="word">
        react · react native · next · typescript · vite · effector · farfetched
        · redux · rtk query · styled-components · mui · tailwind · vitest ·
        testing library
      </SkillsTypography>
    </Container>
  )
}

export default DeveloperSection
