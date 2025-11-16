import { StyledContainer, StyledMusicInfoTitle } from './MusicSection.styled'

const MusicSection = () => {
  return (
    <StyledContainer title="Музыка">
      <StyledMusicInfoTitle value="de4lt">
        соло-гитара <br /> бэк-вокалист
      </StyledMusicInfoTitle>
      <StyledMusicInfoTitle value="самочувствие">
        основная <br /> гитара
      </StyledMusicInfoTitle>
      <StyledMusicInfoTitle
        value="вызов завершён"
        label="вокалист и сонграйтер"
      />
    </StyledContainer>
  )
}

export default MusicSection
