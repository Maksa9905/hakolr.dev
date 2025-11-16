'use client'

import { Typography } from '@/shared/ui'
import styled from 'styled-components'

const Container = styled.nav`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 28px;
`

const MenuItem = styled(Typography)<{ $active?: boolean }>`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme, $active }) =>
    $active ? theme.palette.white : theme.palette.black};
  padding-left: ${({ $active }) => ($active ? '40px' : '0px')};
  max-width: 480px;

  &::before {
    content: '';
    display: block;
    background-color: ${({ theme }) => theme.palette.black};
    width: ${({ $active }) => ($active ? '100%' : '0%')};
    height: 24px;
    position: absolute;
    z-index: -1;
    left: 0;

    transition: all 0.1s ease;
  }

  > a {
    text-decoration: none;
    color: inherit;

    &:focus-visible {
      padding: 5px;
      outline: 2px dashed ${({ theme }) => theme.palette.black};
    }

    &:active {
      padding: 0;
      outline: none;
    }
  }

  transition: all 0.1s ease;
`

const StyledNavigation = {
  Container,
  MenuItem,
}

export default StyledNavigation
