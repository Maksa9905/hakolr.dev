import styled, { css } from 'styled-components'

export const Container = styled.div<{
  $editing?: boolean
  $float?: 'left' | 'right'
}>`
  display: flex;
  gap: 8px;
  flex-direction: row;
  padding: 0.5px;
  float: ${({ $editing, $float }) => ($editing ? 'unset' : $float)};
  ${({ $editing }) =>
    $editing &&
    css`
      border: 2px dashed black;
    `}
`
