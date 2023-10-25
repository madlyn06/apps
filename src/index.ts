import "reflect-metadata"
import express, { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../db/data-source'
import usersRouter from "./routers/user.route"
import { ErrorWithMessage } from "./request/Error"
import {omit} from 'lodash'
import accountRouter from "./routers/account.route"
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((error) => console.log(error))
const app = express()
app.use(express.json())
const port = 3000

app.use('/user', usersRouter)
app.use('/account', accountRouter)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorWithMessage) {
    console.log(err)
    return res.status(err.status).json(omit(err, ['stack', 'index', 'code', 'keyPattern']))
  }
  // Object.getOwnPropertyNames(err).forEach((key) => {
  //   Object.defineProperty(err, key, { enumerable: true })
  // })
  res.status(500).json({
    message: err.message,
    errorInfo: err // omit(err, ['stack'])
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 