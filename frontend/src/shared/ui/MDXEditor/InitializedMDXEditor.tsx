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
} from '@mdxeditor/editor'
import { ForwardedRef } from 'react'
import '@mdxeditor/editor/style.css'
import { MDXEditorContainer } from './MDXEditor.styled'
import { MDXEditorLabel } from './MDXEditor.styled'

type InitializedMDXEditorProps = {
  editorRef: ForwardedRef<MDXEditorMethods> | null
  label?: string
} & MDXEditorProps

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
          plugins={[
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
