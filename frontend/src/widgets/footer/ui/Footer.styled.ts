'use client'

import NextLink from 'next/link'
import styled from 'styled-components'

const Container = styled.footer`
  gap: 8px;

  display: grid;
  grid-template-columns: 28px 28px auto;
  grid-template-rows: repeat(2, 1fr);
`

const Link = styled(NextLink)<{ $column: string; $row: string }>`
  grid-column: ${({ $column }) => $column};
  grid-row: ${({ $row }) => $row};
`

export const StyledFooter = {
  Container,
  Link,
}
