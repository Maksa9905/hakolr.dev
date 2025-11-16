'use client'

import { createElement, HTMLElementType } from 'react'
import styled from 'styled-components'

export type TypographyProps = {
  component?: HTMLElementType
  className?: string
  children: React.ReactNode
  $trimmedTo?: 'line' | 'word'
}

const Typography = ({
  component = 'p',
  children,
  ...props
}: TypographyProps) => {
  return createElement(component, props, children)
}

const StyledTypography = styled(Typography)<{ $trimmedTo?: 'line' | 'word' }>`
  margin: 0;
  padding: 0;

  &::before {
    content: '';
    display: table;
    margin-block-end: ${({ $trimmedTo }) =>
      $trimmedTo === 'word'
        ? 'calc(-0.1em - (1lh - 1em) / 2)'
        : 'calc(-0.3em - (1lh - 1em) / 2)'};
  }

  &::after {
    content: '';
    display: table;
    margin-block-start: ${({ $trimmedTo }) =>
      $trimmedTo === 'word'
        ? 'calc(-0.1em - (1lh - 1em) / 2)'
        : 'calc(-0.1em - (1lh - 1em) / 2)'};
  }
`

export default StyledTypography
