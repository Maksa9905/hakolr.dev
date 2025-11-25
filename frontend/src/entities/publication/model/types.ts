import { PublicationResponse } from '../api/types'

export type PublicationsListQueryParams = Partial<{
  tagIds: string[]
  search: string
  page: number
  limit: number
}>

export type MDXComponents = {
  code?: React.ComponentType<React.HTMLAttributes<HTMLElement>>
  ImageContainer?: React.ComponentType<{ children: React.ReactNode }>
}

export type Publication = PublicationResponse & {
  transformedContent: React.ReactNode
}
