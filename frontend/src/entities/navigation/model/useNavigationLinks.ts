'use client'

import { useAuthorized } from '@/shared/hooks'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

const useNavigationLinks = () => {
  const pathname = usePathname()
  const authorized = useAuthorized()

  const links = useMemo(
    () => [
      {
        label: 'Главная',
        href: '/',
        isActive: pathname === '/',
      },
      {
        label: 'Публикации',
        href: '/publications',
        isActive: pathname === '/publications',
      },
      {
        label: 'Картиночки',
        href: '/pictures',
        isActive: pathname === '/pictures',
      },
    ],
    [pathname],
  )

  if (!authorized) return links

  return [
    ...links,
    {
      label: 'Редактирование',
      href: '/editing',
      isActive: pathname === '/editing',
    },
  ]
}

export default useNavigationLinks
