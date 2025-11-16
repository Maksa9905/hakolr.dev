export type TagSelectProps<Multiple extends boolean | undefined = false> = {
  label: string
  options: TagOption[]
  value: TagSelectValue<Multiple>
  onChange: (tag: TagSelectValue<Multiple>) => void
  multiple?: Multiple
}

export type TagSelectValue<Multiple extends boolean | undefined = false> =
  Multiple extends true ? string[] : string

export type TagOption = {
  id: string
  label: string
}
