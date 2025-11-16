import {
  HeaderContainer,
  HeaderDescription,
  HeaderTitle,
} from './Header.styled'

type HeaderProps = {
  className?: string
  title: string
  description: string
}

const Header = ({ className, title, description }: HeaderProps) => {
  return (
    <HeaderContainer className={className}>
      <HeaderTitle component="h1">{title}</HeaderTitle>
      <HeaderDescription component="p">{description}</HeaderDescription>
    </HeaderContainer>
  )
}

export default Header
