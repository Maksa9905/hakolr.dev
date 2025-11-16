'use client'

import { useCallback, useMemo } from 'react'
import {
  TagSelectButton,
  TagSelectContainer,
  TagSelectLabel,
  TagsListContainer,
} from './TagSelect.styled'
import { TagSelectProps, TagSelectValue } from './types'

const TagSelect = <Multiple extends boolean | undefined = false>({
  options,
  value,
  onChange,
  label,
  multiple,
}: TagSelectProps<Multiple>) => {
  const handleTagSelect = useCallback(
    (id: string) => {
      if (multiple) {
        onChange(
          value.includes(id)
            ? // @ts-expect-error if multiple is true, value is an array
              (value.filter((v) => v !== id) as TagSelectValue<Multiple>)
            : ([...value, id] as TagSelectValue<Multiple>),
        )
      } else {
        if (value === id) {
          onChange('' as TagSelectValue<Multiple>)
        } else {
          onChange(id as TagSelectValue<Multiple>)
        }
      }
    },
    [onChange, value, multiple],
  )

  const values = useMemo(() => {
    if (multiple) return value as TagSelectValue<Multiple>
    return (value ? [value] : []) as TagSelectValue<Multiple>
  }, [multiple, value])

  return (
    <TagSelectContainer>
      <TagSelectLabel as="label">{label}</TagSelectLabel>
      <TagsListContainer>
        {options.map((option) => (
          <TagSelectButton
            key={option.id}
            $selected={values.includes(option.id)}
            onClick={() => handleTagSelect(option.id)}
          >
            {option.label}
          </TagSelectButton>
        ))}
      </TagsListContainer>
    </TagSelectContainer>
  )
}

export default TagSelect
