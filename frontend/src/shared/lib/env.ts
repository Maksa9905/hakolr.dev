export const isRenderScanEnabled = () => {
  if (typeof window === 'undefined') return false

  const renderScan = process.env.NEXT_PUBLIC_RENDER_SCAN

  return renderScan === 'true'
}
