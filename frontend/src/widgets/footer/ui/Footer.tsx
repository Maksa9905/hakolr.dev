import { GitHubIcon, TgIcon, VkIcon, YaMusicIcon } from '@/shared/icons'
import { StyledFooter } from './Footer.styled'

type FooterProps = {
  className?: string
}

const Footer = ({ className }: FooterProps) => {
  return (
    <StyledFooter.Container className={className}>
      <StyledFooter.Link
        $column="1"
        $row="1"
        href="https://t.me/hakolr"
      >
        <TgIcon />
      </StyledFooter.Link>
      <StyledFooter.Link
        $column="2"
        $row="1"
        href="https://m.vk.com/feed"
      >
        <VkIcon />
      </StyledFooter.Link>
      <StyledFooter.Link
        $column="3"
        $row="1"
        href="https://github.com/Maksa9905"
      >
        <GitHubIcon />
      </StyledFooter.Link>
      <StyledFooter.Link
        $column="1 / 4"
        $row="2"
        href="https://music.yandex.ru/users/kuznetsov_dmitriy"
      >
        <YaMusicIcon />
      </StyledFooter.Link>
    </StyledFooter.Container>
  )
}

export default Footer
