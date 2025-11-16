export type PublicationTagResponse = {
  id: string
  label: string
  isMostPopular: boolean
  isMostLiked: boolean
}

export type GetPublicationsParams = {
  tagIds?: string
  search: string
  page: number
  limit: number
}

export type PublicationResponse = {
  id: string
  title: string
  paragraph: string
  description: string
  content: string
  tagIds: string[]
  size: number
  likes: number
  views: number
  createdAt: string
  updatedAt: string
}

export type PublicationStatisticsResponse = {
  latestPosts: [PublicationResponse, PublicationResponse, PublicationResponse]
  mostPopularPost: PublicationResponse
  mostLikedPost: PublicationResponse
}

export type CreatePublicationParams = {
  title: string
  description: string
  paragraph: string
  content: string
  tagIds: string[]
}
