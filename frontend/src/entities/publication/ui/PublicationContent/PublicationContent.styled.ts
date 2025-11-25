'use client'

import styled from 'styled-components'

export const PublicationContentContainer = styled.section`
  width: 100%;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5;

  > * {
    margin-bottom: 16px;
  }

  h2 {
    font-size: 32px;
    font-weight: 600;
    line-height: 1.2;
  }

  h3 {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.2;
  }

  h4 {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.2;
  }

  ul {
    list-style-type: disc;
    padding-left: 20px;
    line-height: 1.5;

    li {
      line-height: 1.8;
    }
  }

  ol {
    list-style-type: decimal;
    padding-left: 20px;

    li {
      line-height: 1.8;
    }
  }

  a {
    color: ${({ theme }) => theme.palette.primary.main};
    text-decoration: underline;
  }

  code {
    color: ${({ theme }) => theme.palette.code.defaultText};
    font-family: 'Martians Mono', monospace;
  }

  img {
    max-width: 100%;
    height: auto;
    margin-right: 16px;
  }

  table {
    width: 100%;
    border-spacing: 0;
    max-width: 700px;

    th {
      padding: 16px;
      border-top: 2px dashed ${({ theme }) => theme.palette.black};
      border-bottom: 2px dashed ${({ theme }) => theme.palette.black};
      border-right: 2px dashed ${({ theme }) => theme.palette.black};

      &:first-child {
        border-left: 2px dashed ${({ theme }) => theme.palette.black};
      }
    }

    td {
      padding: 16px;
      text-align: center;
      border-right: 2px dashed ${({ theme }) => theme.palette.black};
      border-bottom: 2px dashed ${({ theme }) => theme.palette.black};

      &:first-child {
        border-left: 2px dashed ${({ theme }) => theme.palette.black};
        text-align: left;
      }

      &:last-child {
        border-right: 2px dashed ${({ theme }) => theme.palette.black};
      }
    }
  }
`

export const PublicationContentCodeContainer = styled.code`
  display: block;
  overflow-x: auto;
  padding: 1em;
  font-size: 18px;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.palette.code.background};
  color: ${({ theme }) => theme.palette.code.defaultText};
  border-radius: 6px;
  line-height: 1.5;
  font-family: 'Martians Mono', monospace;
  border: 1px solid ${({ theme }) => theme.palette.gray.light};

  code.hljs {
    padding: 3px 5px;
    background: transparent;
  }

  .hljs {
    color: ${({ theme }) => theme.palette.code.defaultText};
  }

  .hljs-comment {
    color: ${({ theme }) => theme.palette.code.comment};
    font-style: italic;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-built_in,
  .hljs-name,
  .hljs-tag {
    color: ${({ theme }) => theme.palette.code.keyword};
  }

  .hljs-string,
  .hljs-title,
  .hljs-section,
  .hljs-attribute,
  .hljs-literal,
  .hljs-template-tag,
  .hljs-template-variable,
  .hljs-type {
    color: ${({ theme }) => theme.palette.code.string};
  }

  .hljs-function {
    color: ${({ theme }) => theme.palette.code.function};
  }

  .hljs-variable,
  .hljs-params {
    color: ${({ theme }) => theme.palette.code.variable};
  }

  .hljs-number {
    color: ${({ theme }) => theme.palette.code.number};
  }

  .hljs-operator,
  .hljs-punctuation {
    color: ${({ theme }) => theme.palette.code.operator};
  }

  .hljs-class .hljs-title {
    color: ${({ theme }) => theme.palette.code.className};
  }

  .hljs-constant {
    color: ${({ theme }) => theme.palette.code.constant};
  }

  .hljs-tag .hljs-attr {
    color: ${({ theme }) => theme.palette.code.attribute};
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: 700;
  }
`
