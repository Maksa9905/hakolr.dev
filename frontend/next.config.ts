// eslint-disable-next-line @typescript-eslint/no-require-imports
const createMDX = require('@next/mdx')

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

module.exports = withMDX(nextConfig)
