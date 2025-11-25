import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import remarkGfm from 'remark-gfm'

import { PublicationResponse } from '../api/types'
import {
  MDXComponents,
  Publication,
  PublicationsListQueryParams,
} from './types'
import { CodeBlock } from '../ui/PublicationContent/CodeBlock'
import { ImageContainer } from '@/shared/ui/MDXEditor'

export const mapPublicationParams = (params: PublicationsListQueryParams) => {
  return {
    tagIds: params.tagIds
      ? Array.isArray(params.tagIds)
        ? params.tagIds.join(',')
        : params.tagIds
      : '',
    search: params.search ?? '',
    page: params.page ?? 1,
    limit: params.limit ?? 10,
  }
}

export const transofrmPublicationResponse = async ({
  content,
  ...response
}: PublicationResponse): Promise<Publication> => {
  const cleanedContent = content.replace(
    /^import\s+.*?from\s+['"].*?['"];?\s*$/gm,
    '',
  )

  const compiled = await evaluate(cleanedContent, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    development: false,
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  })

  const MDXComponent = compiled.default as React.ComponentType<{
    components?: MDXComponents
  }>

  return {
    ...response,
    content,
    transformedContent: (
      <MDXComponent components={{ code: CodeBlock, ImageContainer }} />
    ),
  }
}
