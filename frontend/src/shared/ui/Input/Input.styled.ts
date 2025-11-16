'use client'

import styled, { css } from 'styled-components'
import { Typography } from '..'

const multilineStyles = css`
  min-height: 100px;
  padding-top: 8px;

  resize: vertical;
`

export const StyledInput = styled.input<{ $multiline?: boolean }>`
  min-height: 50px;
  width: 100%;
  border: 2px dashed ${({ theme }) => theme.palette.black};
  padding-left: 16px;
  font-family: 'Martian Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.black};

  &:focus {
    outline: none;
  }

  ${({ $multiline }) => $multiline && multilineStyles}
`

export const StyledLabel = styled(Typography)`
  text-transform: uppercase;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.gray.main};
`

export const StyledInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`
