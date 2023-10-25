import "reflect-metadata"
import express, { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../db/data-source'
import usersRouter from "./routers/user.route"
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((error) => console.log(error))
const app = express()
app.use(express.json())
const port = 3000
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/user', usersRouter)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 