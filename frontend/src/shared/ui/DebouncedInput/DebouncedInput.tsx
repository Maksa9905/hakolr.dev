'use client'

import { useState, useCallback, useEffect } from 'react'
import Input from '../Input'
import { useDebounce } from '@/shared/hooks'

type DebouncedInputProps = {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  className?: string
  delay?: number
  onDebouncedChange?: (debouncedValue: string) => void
}

const DebouncedInput = ({
  label,
  placeholder,
  value,
  onChange,
  className,
  delay = 300,
  onDebouncedChange,
}: DebouncedInputProps) => {
  const [localValue, setLocalValue] = useState(value)
  const debouncedValue = useDebounce(localValue, delay)

  useEffect(() => {
    setLocalValue(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue)
      onDebouncedChange?.(debouncedValue)
    }
  }, [debouncedValue, onChange, onDebouncedChange, value])

  const handleChange = useCallback((newValue: string) => {
    setLocalValue(newValue)
  }, [])

  return (
    <Input
      label={label}
      placeholder={placeholder}
      value={localValue}
      onChange={handleChange}
      className={className}
    />
  )
}

export default DebouncedInput
