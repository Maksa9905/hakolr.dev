'use client'

import Link from 'next/link'
import S from './Navigation.styled'
import { useNavigationLinks } from '@/entities/navigation'

type NavigationProps = {
  className?: string
  onClick?: (href: string) => void
}

const Navigation = ({ className, onClick }: NavigationProps) => {
  const links = useNavigationLinks()

  return (
    <S.Container className={className}>
      {links.map((link) => (
        <S.MenuItem
          key={link.href}
          $active={link.isActive}
        >
          <Link
            href={link.href}
            onClick={() => onClick?.(link.href)}
          >
            {link.label}
          </Link>
        </S.MenuItem>
      ))}
    </S.Container>
  )
}

export default Navigation
