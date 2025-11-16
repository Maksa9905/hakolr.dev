import { useId } from 'react'
import { StyledInput } from './Input.styled'

import { StyledInputContainer, StyledLabel } from './Input.styled'

type InputProps = {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  className?: string
  multiline?: boolean
}

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  className,
  multiline,
}: InputProps) => {
  const id = useId()

  return (
    <StyledInputContainer className={className}>
      <StyledLabel
        as="label"
        htmlFor={id}
      >
        {label}
      </StyledLabel>
      <StyledInput
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        $multiline={multiline}
        as={multiline ? 'textarea' : 'input'}
      />
    </StyledInputContainer>
  )
}

export default Input
