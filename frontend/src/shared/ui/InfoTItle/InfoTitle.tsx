import { ReactNode } from 'react'
import S from './InfoTitle.styled'

type InfoTitleProps = {
  value: string
  label?: string
  children?: ReactNode
  className?: string
}

const InfoTitle = ({ value, label, children, className }: InfoTitleProps) => {
  return (
    <S.Container className={className}>
      <S.Value $trimmedTo="word">{value}</S.Value>
      {children && <S.Label>{children}</S.Label>}
      <S.Label>{label}</S.Label>
    </S.Container>
  )
}

export default InfoTitle
