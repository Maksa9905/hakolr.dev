import {
  PublicationSearchInput,
  PublicationsTagsSelect,
} from '@/entities/publication'
import { PublicationsFiltersContainer } from './PublicationsFilters.styled'

type PublicationsFiltersProps = {
  className?: string
}

const PublicationsFilters = ({ className }: PublicationsFiltersProps) => {
  return (
    <PublicationsFiltersContainer className={className}>
      <PublicationSearchInput />
      <PublicationsTagsSelect />
    </PublicationsFiltersContainer>
  )
}

export default PublicationsFilters
