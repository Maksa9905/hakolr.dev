'use client'

import Markdown from 'react-markdown'
import {
  PublicationContentCodeContainer,
  PublicationContentContainer,
} from './PublicationContent.styled'
import hljs from 'highlight.js'
import { HTMLAttributes, useCallback } from 'react'
import remarkGfm from 'remark-gfm'

type PublicationContentProps = {
  className?: string
  content: string
}

const PublicationContent = ({ content }: PublicationContentProps) => {
  const renderCode = useCallback((props: HTMLAttributes<HTMLElement>) => {
    const { children, className, ...rest } = props
    const match = /language-(\w+)/.exec(className || '')

    if (match) {
      return (
        <PublicationContentCodeContainer
          dangerouslySetInnerHTML={{
            __html: hljs.highlight(String(children).replace(/\n$/, ''), {
              language: match[1],
            }).value,
          }}
        />
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
  }, [])

  return (
    <PublicationContentContainer>
      <Markdown
        components={{
          code: renderCode,
        }}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </Markdown>
    </PublicationContentContainer>
  )

  return null
}

export default PublicationContent
