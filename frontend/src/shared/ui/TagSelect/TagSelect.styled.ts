'use client'

import styled from 'styled-components'
import { Typography } from '..'

export const TagSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const TagsListContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

export const TagSelectButton = styled.button<{ $selected?: boolean }>`
  height: 50px;
  padding: 0 16px;
  border: 2px ${({ $selected }) => ($selected ? 'solid' : 'dashed')} ${({ theme }) => theme.palette.black};
  border-radius: 24px;
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.palette.primary.main : theme.palette.white};
  color: ${({ $selected, theme }) =>
    $selected ? theme.palette.white : theme.palette.black};

  font-family: 'Martian Grotesk', sans-serif;
  font-size: 18px;
  font-weight: 400;
  cursor: pointer;

  transition: all 0.1s ease;

  &:hover {
    transform: scale(0.98);
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus {
    outline: none;
    transform: scale(0.98);
  }
`

export const TagSelectLabel = styled(Typography)`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.gray.main};
  text-transform: uppercase;
`