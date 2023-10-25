import { Router } from "express"
import {  deleteUserController, editUserController, loginController, registerController } from "../controllers/user.controller"
import { wrapRequestHandler } from "../ultills/ultill"
import { accessTokenValidator, addUserValidator, loginValidator, registerValidator } from "~/middlewares/user.middleware"

const usersRouter = Router()

usersRouter.post('/register',registerValidator, wrapRequestHandler(registerController))

usersRouter.post('/login',loginValidator, wrapRequestHandler(loginController))

usersRouter.post('/',accessTokenValidator,addUserValidator,registerValidator, wrapRequestHandler(registerController))
usersRouter.patch('/',accessTokenValidator, wrapRequestHandler(editUserController))
usersRouter.delete('/',accessTokenValidator, wrapRequestHandler(deleteUserController))
// usersRouter.post('/logout', wrapRequestHandler(logoutController))

// usersRouter.get('/me', wrapRequestHandler(getMeController))
export default usersRouter
