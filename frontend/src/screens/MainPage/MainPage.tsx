import {
  AboutMeSection,
  AboutSiteSection,
  DeveloperSection,
  MusicSection,
} from '@/widgets/author'
import { LatestPublicationsSection } from '@/widgets/publications'
import { Header } from '@/widgets/header'
import { PageContainer } from '@/widgets/page-container'

const MainPage = async () => {
  return (
    <>
      <Header
        title="Максим Гайворонский"
        description="Frontend-разработчик · Кавер-исполнитель"
      />
      <PageContainer>
        <DeveloperSection />
        <MusicSection />
        <AboutMeSection />
        <AboutSiteSection />
        <LatestPublicationsSection />
      </PageContainer>
    </>
  )
}

export default MainPage
