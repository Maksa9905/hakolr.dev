'use client'

import { useEffect, useState } from 'react'

const useAuthorized = () => {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) return false

  const isAuthorized = window.document.cookie.includes('isAuthorized')

  return isAuthorized
}

export default useAuthorized
