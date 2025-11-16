'use client'

import styled from 'styled-components'

const Container = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 380px;
  height: 100%;
  padding: 36px;
  background-color: ${({ theme }) => theme.palette.white};
  z-index: 1000;

  transition: transform 0.3s ease;

  @media (max-width: 480px) {
    width: 80%;
  }
`

const Backdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.black};
  z-index: 999;
  opacity: ${({ $isOpen }) => ($isOpen ? 0.5 : 0)};
  transition: opacity 0.3s ease;
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
`

const StyledAsideMenu = {
  Container,
  Backdrop,
}

export default StyledAsideMenu
