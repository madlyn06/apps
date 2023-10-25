import { User } from "db/Entity/User";
import { AppDataSource, userRepository } from "db/data-source";
import { RegisterReqBody, UserRole } from "~/request/user.request";
import { signToken } from "~/ultills/jwt";

class UsersService {
  private signAccessToken({ user_id, role }: { user_id: string; role: UserRole }) {
    return signToken({
      payload: { user_id, role },
      options: { expiresIn: '15m' },
      privateKey: '12344321!@#123!@#'
    })
  }
  private signRefreshToken({ user_id, role }: { user_id: string; role: UserRole }) {
    return signToken({
      payload: { user_id, role },
      options: { expiresIn: '100d' },
      privateKey: '12344321!@#123!@#'
    })
  }
  private signToken({ user_id, role }: { user_id: string; role: UserRole }) {
    return Promise.all([this.signAccessToken({ role, user_id }), this.signRefreshToken({ role, user_id })])
  }
  async register(payload: RegisterReqBody) {
    console.log(payload)
      const user = new User()
      user.username = payload.username
      user.email = payload.email
      user.password = payload.password
      user.role = payload.role
      user.createdAt = new Date()
      user.updatedAt = new Date()
    await userRepository.save(user)
    const [access_token, refresh_token] = await this.signToken({ user_id: user.username, role: user.role })
    return { access_token, refresh_token }
  }
  async login({ user_id, role }: { user_id: string; role: UserRole }) {
    const [access_token, refresh_token] = await this.signToken({ user_id, role })
    return { access_token, refresh_token }
  }
  
}
export const usersService = new UsersService()
