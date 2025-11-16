import { jwtVerify } from 'jose'

export const verifyToken = (token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET as string)
  return jwtVerify(token, secret)
}
