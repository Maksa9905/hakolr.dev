import styled from 'styled-components'

export const StyledImage = styled.img<{
  $float?: 'left' | 'right'
  $width: string
  $height: string
}>`
  float: ${({ $float }) => $float};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
`
