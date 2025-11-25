import { Button, insertJsx$, usePublisher } from '@mdxeditor/editor'
import { StyledImage } from './Image.styles'

type ImageProps = {
  src: string
  float?: 'left' | 'right'
  width: string
  height: string
}

export const Image = ({ src, float, width, height }: ImageProps) => {
  return (
    <StyledImage
      $float={float}
      $height={height}
      $width={width}
      src={src}
    />
  )
}

export const InsertImageContainer = () => {
  const insertJsx = usePublisher(insertJsx$)

  return (
    <Button
      onClick={() =>
        insertJsx({
          name: 'img',
          kind: 'flow',
          props: {},
        })
      }
    >
      ᎒᎒᎒
    </Button>
  )
}
