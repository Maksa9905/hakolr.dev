'use client'

import styled from 'styled-components'
import { Typography } from '..'

export const MDXEditorContainer = styled.div`
  border: 2px dashed ${({ theme }) => theme.palette.black};
`
export const MDXEditorLabel = styled(Typography)`
  font-size: 18px;
  color: ${({ theme }) => theme.palette.gray.main};
  text-transform: uppercase;
  margin-bottom: 8px;
`