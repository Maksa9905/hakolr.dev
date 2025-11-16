'use client'

import { ReactNode } from 'react'
import S from './RootLayout.styled'
import { AsideMenu } from '@/widgets/aside-menu'

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <S.Navigation />
      {children}
      <S.Footer />
      <AsideMenu />
    </>
  )
}

export default RootLayout
