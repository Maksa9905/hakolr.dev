import { useDateTransform } from '@/entities/publication'
import {
  CardContainer,
  CardDatetime,
  CardParagraph,
  CardTitle,
} from './LatestPublicationSection.styled'
import { Link } from '@/shared/ui'

type LatestPublicationCardProps = {
  id: string
  title: string
  paragraph: string
  datetime: string
}

const LatestPublicationCard = ({
  id,
  title,
  paragraph,
  datetime,
}: LatestPublicationCardProps) => {
  const transformedDatetime = useDateTransform(datetime)

  return (
    <CardContainer>
      <CardTitle
        $trimmedTo="word"
        component="h3"
      >
        <Link href={`/publications/${id}`}>{title}</Link>
      </CardTitle>
      <CardParagraph
        $trimmedTo="word"
        component="p"
      >
        {paragraph}
      </CardParagraph>
      <CardDatetime component="p">
        <time dateTime={datetime}>{transformedDatetime}</time>
      </CardDatetime>
    </CardContainer>
  )
}

export default LatestPublicationCard
