export enum UserRole {
    User,
    Admin,
}
export interface RegisterReqBody {
  username: string
  email: string
  password: string
  role:UserRole
}