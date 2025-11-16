'use client'

import { AsideMenu } from '@/shared/ui'
import { Navigation } from '@/widgets/navigation'
import styled, { css } from 'styled-components'

const StyledNavigation = styled(Navigation)`
  width: 100%;
`

const ToggleButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  color: ${({ theme }) => theme.palette.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  border-radius: 50%;
  opacity: 1;
  transition: opacity 0.3s ease;

  svg {
    width: 20px;
    height: 20px;
    transition: color 0.5s ease,
      transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  &:hover svg {
    color: ${({ theme }) => theme.palette.black};
    transform: scale(1.1) rotate(90deg);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 480px) {
    svg {
      width: 16px;
      height: 16px;
    }
  }
`

const ClosedAsideMenu = css`
  width: 60px;
  height: 60px;
  top: auto;
  bottom: 24px;
  left: 24px;
  border-radius: 50%;
  padding: 0;
  background-color: ${({ theme }) => theme.palette.black};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.palette.white};
    border: 2px solid ${({ theme }) => theme.palette.black};
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }

  transition: all 0.4s ease;

  ${StyledNavigation} {
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    bottom: 20px;
    left: 20px;
  }

  > div[id*='aside-menu-backdrop'] {
    display: none;
  }
`

const Container = styled(AsideMenu)<{ $isOpen: boolean }>`
  transition: all 0.4s ease;

  ${StyledNavigation} {
    opacity: 1;
    transition: opacity 0.3s ease 0.2s;
  }

  ${({ $isOpen }) => ($isOpen ? '' : ClosedAsideMenu)}

  @media (min-width: 1441px) {
    display: none;
  }
`

const StyledAsideMenu = {
  Container,
  ToggleButton,
  Navgation: StyledNavigation,
}

export default StyledAsideMenu
