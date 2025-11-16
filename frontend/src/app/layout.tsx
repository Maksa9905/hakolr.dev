import { Providers } from './providers'

import StyledComponentsRegistry from '@/shared/lib/registry'
import CommonLayout from '@/screens/RootLayout'
import { RenderScanScript } from '@/shared/ui/RenderScanScript/RenderScanScript'

import '@/application/global.css'
import { Viewport } from 'next'
import { theme } from '@/application/theme'

type RootLayoutProps = {
  children: React.ReactNode
}

export async function generateMetadata() {
  return {
    title: 'Максим Гайворонский',
    description: 'Разработчик веб-интерфейсов',
  }
}

export const viewport: Viewport = {
  themeColor: theme.palette.black,
  width: 'device-width',
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru">
      <body style={{ fontFamily: 'Martian Grotesk' }}>
        <Providers>
          <StyledComponentsRegistry>
            <CommonLayout>{children}</CommonLayout>
            <RenderScanScript />
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  )
}
