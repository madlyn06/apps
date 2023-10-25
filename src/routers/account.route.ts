import { Router } from "express"
import { wrapRequestHandler } from "../ultills/ultill"
import { accessTokenValidator} from "~/middlewares/user.middleware"
import { createAccountController, editAccountController, getAccountController, removeAccountController } from "~/controllers/account.controller"
import { deleteUserController } from "~/controllers/user.controller"

const accountRouter = Router()

accountRouter.post('/create',accessTokenValidator, wrapRequestHandler(createAccountController))
accountRouter.get('/get', wrapRequestHandler(getAccountController))
accountRouter.patch('/edit',accessTokenValidator, wrapRequestHandler(editAccountController))
accountRouter.delete('/delete',accessTokenValidator, wrapRequestHandler(removeAccountController))

export default accountRouter
