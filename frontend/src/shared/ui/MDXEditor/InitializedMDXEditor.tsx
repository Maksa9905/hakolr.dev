'use client'

import {
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  BoldItalicUnderlineToggles,
  UndoRedo,
  toolbarPlugin,
  BlockTypeSelect,
  CodeToggle,
  headingsPlugin,
  codeBlockPlugin,
  InsertCodeBlock,
  codeMirrorPlugin,
  listsPlugin,
  ListsToggle,
  linkPlugin,
  CreateLink,
  tablePlugin,
  InsertTable,
  imagePlugin,
  InsertImage,
  JsxComponentDescriptor,
  jsxPlugin,
  GenericJsxEditor,
} from '@mdxeditor/editor'
import { ForwardedRef } from 'react'
import '@mdxeditor/editor/style.css'
import { MDXEditorContainer } from './MDXEditor.styled'
import { MDXEditorLabel } from './MDXEditor.styled'
import { FileApi } from '@/shared/api'
import {
  InsertImageContainer,
  ImageContainerEditor,
} from './components/ImageContainer'

type InitializedMDXEditorProps = {
  editorRef: ForwardedRef<MDXEditorMethods> | null
  label?: string
} & MDXEditorProps

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
  {
    name: 'ImageContainer',
    kind: 'flow',
    source: './jsx/ImageContainer',
    props: [{ name: '$float', type: 'string' }],
    hasChildren: true,
    Editor: ImageContainerEditor,
  },
  {
    name: 'img',
    kind: 'flow',
    source: './jsx/Image',
    props: [
      { name: 'src', type: 'string' },
      { name: '$width', type: 'string' },
      { name: '$height', type: 'string' },
    ],
    hasChildren: true,
    Editor: GenericJsxEditor,
  },
]

const InitializedMDXEditor = ({
  editorRef,
  label,
  ...props
}: InitializedMDXEditorProps) => {
  return (
    <div>
      <MDXEditorLabel $trimmedTo="line">{label}</MDXEditorLabel>
      <MDXEditorContainer>
        <MDXEditor
          onChange={(value) => console.debug(value)}
          plugins={[
            jsxPlugin({ jsxComponentDescriptors }),
            headingsPlugin(),
            linkPlugin(),
            codeBlockPlugin({
              defaultCodeBlockLanguage: 'ts',
            }),
            listsPlugin(),
            tablePlugin(),
            codeMirrorPlugin({
              codeBlockLanguages: {
                ts: 'TypeScript',
                css: 'CSS',
                tsx: 'React TSX',
                jsx: 'React JSX',
                html: 'HTML',
              },
            }),
            imagePlugin({
              imageUploadHandler: FileApi.uploadImage,
            }),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <BlockTypeSelect />
                  <CodeToggle />
                  <InsertCodeBlock />
                  <ListsToggle />
                  <CreateLink />
                  <InsertTable />
                  <InsertImage />
                  <InsertImageContainer />
                </>
              ),
            }),
          ]}
          {...props}
          ref={editorRef}
        />
      </MDXEditorContainer>
    </div>
  )
}

export default InitializedMDXEditor
