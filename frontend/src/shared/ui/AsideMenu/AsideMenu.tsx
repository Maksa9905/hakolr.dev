'use client'

import { ReactNode, useEffect, useState } from 'react'
import S from './AsideMenu.styled'
import { createPortal } from 'react-dom'

type AsideMenuProps = {
  className?: string
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

const AsideMenu = ({
  className,
  children,
  isOpen,
  onClose,
}: AsideMenuProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const backdrop = mounted
    ? createPortal(
        <S.Backdrop
          onClick={onClose}
          $isOpen={isOpen}
        />,
        document.body,
        'aside-menu-backdrop',
      )
    : null

  return (
    <>
      <S.Container
        className={className}
        $isOpen={isOpen}
      >
        {children}
        {backdrop}
      </S.Container>
    </>
  )
}

export default AsideMenu
