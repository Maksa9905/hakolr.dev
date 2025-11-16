'use client'

import styled from 'styled-components'

export const StyledPageContainer = styled.main`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  max-width: 1010px;
  margin: 0 auto;
  height: fit-content;

  @media (max-width: 1600px) {
    margin: 0;
    margin-left: calc(100vw - 1010px - 36px);
  }

  @media (max-width: 1440px) {
    margin: 16px;
    max-width: 100%;
  }
`
