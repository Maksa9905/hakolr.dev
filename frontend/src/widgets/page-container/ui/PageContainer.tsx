import { StyledPageContainer } from './PageContainer.styled'

type PageContainerProps = {
  children: React.ReactNode
}

const PageContainer = ({ children }: PageContainerProps) => {
  return <StyledPageContainer>{children}</StyledPageContainer>
}

export default PageContainer
