'use client'

import { ContrastText } from '@/shared/ui'
import { useMediaQuery } from 'react-responsive'
import {
  StyledContainer,
  StyledImage,
  StyledParagraph,
} from './AboutMeSection.styled'

const AboutMeSection = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })

  return (
    <StyledContainer title="О себе">
      <StyledParagraph component="p">
        <ContrastText>Привет, я Макс.</ContrastText> Кнопкокрас и формошлёп из
        Нижнего Новгорода. Пилю веб-интерфейсы на реакте. Хочу научиться делать
        крутые интересные дизайны. Люблю эффектор и терпеть не могу редакс.
      </StyledParagraph>
      <StyledImage
        src="/photo.jpg"
        alt="About Me"
        width={220}
        height={220}
      />
      <StyledParagraph component="p">
        Считаю, что у каждого уважающего себя фронтендера должен быть
        сайт-визитка. Разрабы вкладывают столько сил и времени, но всегда
        остаются за кулисами.
      </StyledParagraph>

      <StyledParagraph component="p">
        Поэтому, представляю вашему вниманию: <br />
        <ContrastText>{isMobile ? '⇡' : '⇠'} ВОТ ОН Я</ContrastText>
      </StyledParagraph>

      <StyledParagraph>
        В свободное время пишу попсовый рок под электруху, в том числе на заказ.
        Играю на <ContrastText>JACKSON JS22</ContrastText> (нет, это не джава
        скрипт).
      </StyledParagraph>
    </StyledContainer>
  )
}

export default AboutMeSection
