import { ReactNode } from 'react'
import { StyledButton } from './Button.styled'

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  variant?: 'contained' | 'outlined'
}

const Button = ({ children, onClick, variant = 'contained' }: ButtonProps) => {
  return (
    <StyledButton
      onClick={onClick}
      $variant={variant}
    >
      {children}
    </StyledButton>
  )
}

export default Button
