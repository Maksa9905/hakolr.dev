'use client'

import { Typography } from '@/shared/ui'
import styled from 'styled-components'

export const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 2px dashed ${({ theme }) => theme.palette.black};
  height: 100%;
  box-sizing: border-box;
`

export const SectionTitle = styled(Typography)`
  font-size: 18px;
  font-weight: 400;
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.gray.main};
`
