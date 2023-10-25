import { NextFunction, Request, Response } from "express"
import { checkSchema } from "express-validator"
import { userMessage } from "~/constant/messageError"
import { ErrorWithMessage } from "~/request/Error"
import { usersService } from "~/services/user.service"
import { verifyToken } from "~/ultills/jwt"
import { validate } from "~/ultills/validation"
import { JsonWebTokenError } from 'jsonwebtoken'
export const registerValidator = validate(
  checkSchema(
    {
      username: {
        notEmpty: {
          errorMessage: userMessage.NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: userMessage.NAME_MUST_BE_A_STRING
        },
        isLength: {
          errorMessage: userMessage.NAME_LENGTH_MUST_BE_FROM_1_TO_100,
          options: {
            min: 1,
            max: 100
          }
        },
        trim: true,
        custom: {
          options: async (value) => {
            if (await usersService.checkUsernameExist(value)) {
                throw new Error('Username already exist')
            }
            return true
          }
        }
      },
      email: {
        notEmpty: {
          errorMessage: userMessage.EMAIL_IS_REQUIRED
        },
        isEmail: { errorMessage: userMessage.EMAIL_IS_INVALID },
        trim: true,
        custom: {
          options: async (value) => {
            if (await usersService.checkEmailExist(value)) {
              throw new Error('Email already exist')
            }
            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: userMessage.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: userMessage.PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          errorMessage: userMessage.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50,
          options: {
            min: 6,
            max: 50
          }
        },
        isStrongPassword: {
          options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: userMessage.PASSWORD_MUST_BE_STRONG
        }
      },
      role:{
        notEmpty: {
          errorMessage: userMessage.ROLE_IS_REQUIRED
        },
        custom: {
          options: async (value) => {
            if(value !== 1 && value !== 0){
              throw new Error("Value must be 1 or 0")
            }
          }
        }
      }
    },
    ['body']
  )
)
export const loginValidator = validate(
  checkSchema(
    {
      username: {
        notEmpty: {
          errorMessage: userMessage.NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: userMessage.NAME_MUST_BE_A_STRING
        },
        isLength: {
          errorMessage: userMessage.NAME_LENGTH_MUST_BE_FROM_1_TO_100,
          options: {
            min: 1,
            max: 100
          }
        },
        trim: true,
        custom: {
          options: async (value) => {
            if (!(await usersService.checkUsernameExist(value))) {
                throw new Error('Not found username')
            }
            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: userMessage.PASSWORD_IS_REQUIRED
        },
        isString: {
          errorMessage: userMessage.PASSWORD_MUST_BE_A_STRING
        },
        isLength: {
          errorMessage: userMessage.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50,
          options: {
            min: 6,
            max: 50
          }
        },
        isStrongPassword: {
          options: {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
          },
          errorMessage: userMessage.PASSWORD_MUST_BE_STRONG
        }
      }
    },
    ['body']
  )
)

export const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new ErrorWithMessage({
                status: 400,
                message: userMessage.NOT_FOUND_ACCESSTOKEN
              })
            }
            const access_token = value.split(' ')[1]
            if (!access_token)
              throw new ErrorWithMessage({
                status: 404,
                message: userMessage.NOT_FOUND_ACCESSTOKEN
              })
            try {
              const decoded_access_token = await verifyToken({
                token: access_token,
                privateKey: '12344321!@#123!@#'
              })
              ;(req as Request).decoded_access_token = decoded_access_token
            } catch (error) {
              throw new ErrorWithMessage({
                status: 400,
                message: (error as JsonWebTokenError).message
              })
            }
          }
        }
      }
    },
    ['headers']
  )
)
export const addUserValidator = (req: Request, res: Response, next: NextFunction) => {
  const {role} = req.decoded_access_token
  if(role === 1) {
    throw new ErrorWithMessage({status:400, message:"You don't have permission"})
  }
  next()
}