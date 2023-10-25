import { User } from "db/Entity/User"
import { UserRole } from "./request/user.request"
export interface TokenPayLoad extends JwtPayload {
  user_id: string
  role: UserRole
}
declare module 'express' {
  interface Request {
    user?: User
    decoded_access_token?: TokenPayLoad
    decoded_refresh_token?: TokenPayLoad
  }
}