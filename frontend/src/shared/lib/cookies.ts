export const cookies = () => {
  const cookies = document.cookie.split('; ')

  const getCookie = (name: string) => {
    return cookies.find((row) => row.startsWith(name + '='))?.split('=')[1]
  }

  return {
    get: getCookie,
  }
}
