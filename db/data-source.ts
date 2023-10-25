import { DataSource } from 'typeorm'
import {User} from './Entity/User'
import {Account} from './Entity/Accout'
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "apps",
    synchronize: true,
    logging: true,
    entities: [User, Account],
    subscribers: [],
    migrations: [],
})
export const userRepository = AppDataSource.getRepository(User)
export const accoutRepository = AppDataSource.getRepository(Account)