import { Section, Typography } from '@/shared/ui'
import { SectionContent } from '@/shared/ui/Section/Section.styled'
import styled from 'styled-components'

export const Container = styled(Section)`
  flex: 7.65;

  ${SectionContent} {
    @media (max-width: 1080px) {
      gap: 8px;
    }
  }
`

export const SkillsTypography = styled(Typography)`
  font-size: 12px;
  min-width: 370px;
  color: ${({ theme }) => theme.palette.gray.main};
  text-transform: uppercase;
  text-align: justify;

  @media (max-width: 480px) {
    min-width: 250px;
  }
`

export const DeveloperInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 1080px) {
    flex-direction: row;
    gap: 8px;
  }
`
