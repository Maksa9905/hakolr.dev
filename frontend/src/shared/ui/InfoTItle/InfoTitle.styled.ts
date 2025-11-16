'use client'

import styled from 'styled-components'
import { Typography } from '..'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

const Label = styled(Typography)`
  max-width: 160px;
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
`

const Value = styled(Typography)`
  font-size: 36px;
  font-weight: 700;
  text-transform: uppercase;
  white-space: nowrap;

  @media (max-width: 1080px) {
    font-size: 28px;
  }

  @media (max-width: 600px) {
    font-size: 24px;
  }
`

const StyledInfoTitle = {
  Container,
  Label,
  Value,
}

export default StyledInfoTitle
