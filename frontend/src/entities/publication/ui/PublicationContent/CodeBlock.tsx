'use client'

import { HTMLAttributes, useEffect, useRef } from 'react'
import hljs from 'highlight.js'
import { PublicationContentCodeContainer } from './PublicationContent.styled'

export function CodeBlock(props: HTMLAttributes<HTMLElement>) {
  const { children, className, ...rest } = props
  const codeRef = useRef<HTMLElement>(null)
  const match = /language-(\w+)/.exec(className || '')

  useEffect(() => {
    if (match && codeRef.current) {
      hljs.highlightElement(codeRef.current)
    }
  }, [match])

  if (match) {
    return (
      <PublicationContentCodeContainer
        ref={codeRef}
        className={className}
        {...rest}
      >
        {children}
      </PublicationContentCodeContainer>
    )
  }

  return (
    <code
      {...rest}
      className={className}
    >
      {children}
    </code>
  )
}
