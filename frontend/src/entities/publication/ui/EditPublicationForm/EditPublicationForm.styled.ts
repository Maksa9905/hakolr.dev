'use client'

import styled from 'styled-components'

export const EditPublicationFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`
export const ButtonsContainer = styled.div<{ $isNew: boolean }>`
  display: grid;
  grid-template-columns: ${({ $isNew }) => ($isNew ? '1fr' : '5fr 1fr')};
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`