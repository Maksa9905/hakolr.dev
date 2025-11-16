import { LinkProps } from 'next/link'
import { StyledLink } from './Link.styled'
import { PropsWithChildren } from 'react'

const Link = (props: PropsWithChildren<LinkProps>) => {
  return (
    <StyledLink
      as="a"
      {...props}
    />
  )
}

export default Link
