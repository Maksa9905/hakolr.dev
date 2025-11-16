import { createStore } from 'effector'
import { createEvent } from 'effector'

export const $title = createStore('')
export const $description = createStore('')
export const $preview = createStore('')
export const $content = createStore('')
export const $tags = createStore<string[]>([])

export const titleChanged = createEvent<string>()
export const descriptionChanged = createEvent<string>()
export const previewChanged = createEvent<string>()
export const contentChanged = createEvent<string>()
export const tagsChanged = createEvent<string[]>()

export const publicationDataInitialized = createEvent<{
  title: string
  description: string
  preview: string
  content: string
  tags: string[]
}>()

$title.on(titleChanged, (_, title) => title)
$description.on(descriptionChanged, (_, description) => description)
$preview.on(previewChanged, (_, preview) => preview)
$content.on(contentChanged, (_, content) => content)
$tags.on(tagsChanged, (_, tags) => tags)

$title.on(publicationDataInitialized, (_, { title }) => title)
$description.on(publicationDataInitialized, (_, { description }) => description)
$preview.on(publicationDataInitialized, (_, { preview }) => preview)
$content.on(publicationDataInitialized, (_, { content }) => content)
$tags.on(publicationDataInitialized, (_, { tags }) => tags)
