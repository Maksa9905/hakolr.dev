'use client'

import { Section, Typography } from '@/shared/ui'
import { SectionContent } from '@/shared/ui/Section'
import NextImage from 'next/image'
import styled from 'styled-components'

export const StyledContainer = styled(Section)`
  ${SectionContent} {
    display: block;
  }

  min-width: 600px;
  flex: 10;

  @media (max-width: 768px) {
    min-width: 330px;
  }

  @media (max-width: 600px) {
    ${SectionContent} {
      display: grid;
      gap: 0;
    }
  }
`

export const StyledTitle = styled(Typography)`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 28px;
`

export const StyledParagraph = styled(Typography)`
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 28px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const StyledImage = styled(NextImage)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  float: left;
  margin: 0 16px 8px 0;

  @media (max-width: 600px) {
    float: none;
    height: auto;
    width: 90%;
    margin: 0 auto 16px;
    grid-row: 3;
  }
`
