'use client'

import { InfoTitle, Section } from '@/shared/ui'
import { SectionContent } from '@/shared/ui/Section/Section.styled'
import styled from 'styled-components'

export const StyledContainer = styled(Section)`
  flex: 10;

  ${SectionContent} {
    @media (max-width: 1080px) {
      gap: 8px;
    }
  }
`

export const StyledMusicInfoTitle = styled(InfoTitle)`
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`