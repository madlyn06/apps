import { Router } from "express"
import {  deleteUserController, editUserController, loginController, registerController } from "../controllers/user.controller"
import { wrapRequestHandler } from "../ultills/ultill"

const usersRouter = Router()

usersRouter.post('/register', wrapRequestHandler(registerController))

usersRouter.post('/login', wrapRequestHandler(loginController))

usersRouter.post('/', wrapRequestHandler(registerController))
usersRouter.patch('/', wrapRequestHandler(editUserController))
usersRouter.delete('/', wrapRequestHandler(deleteUserController))
// usersRouter.post('/logout', wrapRequestHandler(logoutController))

// usersRouter.get('/me', wrapRequestHandler(getMeController))
export default usersRouter
