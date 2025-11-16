'use client'

import { Section, Typography } from '@/shared/ui'
import { SectionContent } from '@/shared/ui/Section'
import styled from 'styled-components'

export const SectionContainer = styled(Section)`
  ${SectionContent} {
    padding: 0%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    gap: 0;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3, 1fr);
    }
  }
`

export const CardContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  padding: 16px;
  border-right: 2px dashed ${({ theme }) => theme.palette.black};

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 2px dashed ${({ theme }) => theme.palette.black};

    &:last-child {
      border-bottom: none;
    }
  }

  &:last-child {
    border-right: none;
  }
`

export const CardTitle = styled(Typography)`
  font-size: 28px;
  font-weight: 700;
  line-height: 25px;
  flex: 1;

  @media (max-width: 1080px) {
    font-size: 24px;
    line-height: 22px;
  }

  @media (max-width: 768px) {
    font-size: 28px;
    line-height: 25px;
  }
`

export const CardParagraph = styled(Typography)`
  font-size: 16px;
  font-weight: 400;
  line-height: 25px;
  padding: 4px 0;
  overflow: hidden;
  text-overflow: clip;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`

export const CardDatetime = styled(Typography)`
  align-self: flex-end;
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.gray.main};
`
