'use client'

import styled, { css } from 'styled-components'

const containedStyles = css`
  background-color: ${({ theme }) => theme.palette.black};
  border: none;
  color: ${({ theme }) => theme.palette.white};
`

const outlinedStyles = css`
  background-color: transparent;
  border: 2px dashed ${({ theme }) => theme.palette.black};
  color: ${({ theme }) => theme.palette.black};
`

export const StyledButton = styled.button<{ $variant: 'contained' | 'outlined' }>`
  height: 50px;
  width: 100%;
  min-width: 100px;
  font-size: 18px;
  cursor: pointer;
  text-transform: uppercase;

  ${({ $variant }) => $variant === 'contained' && containedStyles}
  ${({ $variant }) => $variant === 'outlined' && outlinedStyles}
`
