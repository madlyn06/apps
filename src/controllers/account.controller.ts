import { Account } from "db/Entity/Accout";
import { accoutRepository } from "db/data-source";
import { Request, Response } from "express";

export const createAccountController = async (req: Request, res: Response) => {    
    const {type} = req.body
    console.log(123)
    const account = new Account()
    account.type = type
    const savedAccount = await accoutRepository.save(account)
    return res.json({ message: 'Create account successfully', result: savedAccount })
}

export const getAccountController = async (req: Request, res: Response) => {    
    const results = await accoutRepository.find()
    return res.json({ message: 'Create account successfully', result: results })
}
export const editAccountController = async (req: Request, res: Response) => {    
    const {type,id} = req.body
    const account = accoutRepository.findOneBy({id})
    if(account) {
    await accoutRepository.update({id},{type})
    return res.json({ message: 'Edit account successfully' })
    } 
    return res.json({ message: 'Edit account failed' })
    
}
export const removeAccountController = async (req: Request, res: Response) => {    
    const {id} = req.body
    const account = accoutRepository.findOneBy({id})
    if(account) {
    await accoutRepository.delete({id})
    return res.json({ message: 'Delete account successfully' })
    } 
    return res.json({ message: 'Delete account failed' })
}