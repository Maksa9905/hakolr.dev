'use client'

import { Navigation } from '@/widgets/navigation'
import { Footer } from '@/widgets/footer'
import styled from 'styled-components'

const StyledNavigation = styled(Navigation)`
  width: calc((100vw - 1010px) / 2 - 100px);
  position: fixed;
  top: 64px;
  left: 36px;

  @media (max-width: 1600px) {
    width: calc((100vw - 1010px) - 100px);
  }

  @media (max-width: 1440px) {
    display: none;
  }
`

const StyledFooter = styled(Footer)`
  position: fixed;
  bottom: 36px;
  left: 36px;

  @media (max-width: 1440px) {
    display: none;
  }
`

const StyledRootLayout = {
  Navigation: StyledNavigation,
  Footer: StyledFooter,
}

export default StyledRootLayout
