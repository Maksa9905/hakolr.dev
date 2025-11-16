'use client'

import { Typography } from '@/shared/ui'
import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 1010px;
  margin: 64px auto 60px;

  @media (max-width: 1600px) {
    text-align: left;
    margin: 64px 0;
    margin-left: calc(100vw - 1010px - 36px);
  }

  @media (max-width: 1440px) {
    width: fit-content;
    margin-left: 16px;
    margin-right: 108px;
  }

  @media (max-width: 480px) {
    margin-right: 64px;
  }

  @media (max-width: 400px) {
    margin-right: 16px;
  }
`

export const HeaderTitle = styled(Typography)`
  font-weight: 700;
  font-size: 70px;
  line-height: 65px;

  @media (max-width: 1080px) {
    font-size: 50px;
    line-height: 50px;
  }

  @media (max-width: 600px) {
    font-size: 36px;
    line-height: 36px;
  }
`

export const HeaderDescription = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.gray.main};

  @media (max-width: 1080px) {
    font-size: 18px;
    line-height: 20px;
  }

  @media (max-width: 600px) {
    font-size: 16px;
    line-height: 18px;
  }

  @media (max-width: 480px) {
    white-space: normal;
  }
`
