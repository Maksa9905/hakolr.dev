import MainPage from '@/screens/MainPage'
import { prefetchMainPage } from './prefetch'
import { dehydrate } from '@tanstack/react-query'
import { HydrationBoundary } from '@tanstack/react-query'

export default async function Home() {
  const queryClient = await prefetchMainPage()

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainPage />
    </HydrationBoundary>
  )
}
