'use client'

import Link from 'next/link'
import styled from 'styled-components'

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.black};

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`