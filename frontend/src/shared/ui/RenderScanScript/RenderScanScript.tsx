'use client'

import { useEffect } from 'react'
import { isRenderScanEnabled } from '@/shared/lib/env'

export const RenderScanScript = () => {
  useEffect(() => {
    if (!isRenderScanEnabled()) return

    const script = document.createElement('script')
    script.crossOrigin = 'anonymous'
    script.src = '//unpkg.com/react-scan/dist/auto.global.js'
    document.body.appendChild(script)
  }, [])

  return null
}
