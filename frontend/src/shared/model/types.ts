export enum ERoutes {
  HOME = '^/$',
  PUBLICATIONS = '^/publications$',
  PUBLICATION_DETAILS = '^/publications/[^/]+$',
}

export const getRouteByPathname = (pathname: string): ERoutes | null => {
  console.log(pathname)
  for (const [key, pattern] of Object.entries(ERoutes)) {
    const regex = new RegExp(pattern)
    if (regex.test(pathname)) {
      return ERoutes[key as keyof typeof ERoutes]
    }
  }
  return null
}
