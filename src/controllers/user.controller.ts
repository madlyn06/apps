import { NextFunction, Request, Response } from "express"
import { usersService } from "../services/user.service"
import { AppDataSource, userRepository } from "db/data-source"
import { User } from "db/Entity/User"
import { DataSource } from "typeorm"

export const loginController = async (req: Request, res: Response) => {
  const { username, password } = req.body
  const user = await userRepository.findOneBy({ username, password })
  if(user) {
    const result = await usersService.login({ user_id: username, role: user.role })
    return res.json({ message: 'Login success', result })
  } else {
    return res.json({ message: 'Login failed' })
  }
}

export const registerController = async (
  req: Request,
  res: Response,
) => {
  const result = await usersService.register(req.body)
  return res.json({ message: 'Register success', result })
}

export const editUserController = async(req: Request, res: Response)=>{
  const {username, role,password } = req.body
  const user = await userRepository.findOneBy({ username })
  if(user) {
    await userRepository.update({username},{password, role} ) 
    return res.json({ message: 'Update succesfully' })
  } else {
    return res.json({ message: 'Update failed' })
  }
}
export const deleteUserController = async(req: Request, res: Response)=>{
  const {username} = req.body
  const user = await userRepository.findOneBy({ username })
  if(user) {
    await userRepository.remove(user)
    return res.json({ message: 'Delete succesfully' })
  } else {
    return res.json({ message: 'Delete failed' })
  }
}