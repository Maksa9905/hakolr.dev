'use client'

import {
  Button,
  insertJsx$,
  NestedLexicalEditor,
  usePublisher,
} from '@mdxeditor/editor'
import { Container } from './ImageContainer.styles'

type ImageContainerProps = {
  children: React.ReactNode | React.ReactNode[]
  editing?: boolean
  float?: 'right' | 'left'
}

type ImageContainerNode = {
  name: 'ImageContainer'
  type: 'textDirective'
  attributes: {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
}

export const ImageContainer = ({
  children,
  editing,
  float,
}: ImageContainerProps) => {
  return (
    <Container
      $float={float}
      $editing={editing}
    >
      {children}
    </Container>
  )
}

export const InsertImageContainer = () => {
  const insertJsx = usePublisher(insertJsx$)

  return (
    <>
      <Button
        onClick={() =>
          insertJsx({
            name: 'ImageContainer',
            kind: 'flow',
            props: {
              float: 'right',
            },
          })
        }
      >
        ↤᎒᎒
      </Button>
      <Button
        onClick={() =>
          insertJsx({
            name: 'ImageContainer',
            kind: 'flow',
            props: {
              float: 'left',
            },
          })
        }
      >
        ᎒᎒↦
      </Button>
    </>
  )
}

export const ImageContainerEditor = () => {
  return (
    <Container $editing={true}>
      <NestedLexicalEditor<ImageContainerNode>
        getContent={(node) => {
          console.debug(node.children)
          return node.children
        }}
        getUpdatedMdastNode={(mdastNode, children) => {
          console.debug(mdastNode, children)
          return { ...mdastNode, children }
        }}
      />
    </Container>
  )
}
