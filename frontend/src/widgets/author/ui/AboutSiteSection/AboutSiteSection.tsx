import { ContrastText } from '@/shared/ui'
import { StyledContainer, StyledParagraph } from './AboutSiteSection.styled'

const AboutSiteSection = () => {
  return (
    <StyledContainer title="О сайте">
      <StyledParagraph>
        Этот сайт своего рода <ContrastText>протест против</ContrastText>{' '}
        привычных <ContrastText>телеграмм каналов</ContrastText> - для меня
        такой формат ведения личного блога не подходит.
      </StyledParagraph>
      <StyledParagraph>
        Я хочу дифференцировать контент для читателей:
      </StyledParagraph>
      <StyledParagraph>
        Те, кто интересуется музыкой читайте раздел{' '}
        <ContrastText>о музыке.</ContrastText>
      </StyledParagraph>
      <StyledParagraph>
        Кому нравится разработке - заходите в раздел{' '}
        <ContrastText>о разработке.</ContrastText>
      </StyledParagraph>
      <StyledParagraph>
        А тех, кто просто хочет почитать о тягостях жизни обычного студента из
        НН, заходите в <ContrastText>об авторе.</ContrastText>
      </StyledParagraph>
    </StyledContainer>
  )
}

export default AboutSiteSection
