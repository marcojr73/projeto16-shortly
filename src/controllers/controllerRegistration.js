import connectDB from "../config/bank.js"
import bcrypt from "bcrypt"
import dayjs from "dayjs"
import { v4 as uuid } from 'uuid'
import { registrationRepository } from "../repositories/repositoryRegistration.js"

export async function signUp(req, res){

    const {name, email, password} = req.body
    const date = dayjs().format('DD/MM/YYYY') 
    const passCripty = bcrypt.hashSync(password, 10)
    
    try {
        await registrationRepository.insertUser(name, email, passCripty, date)

        res.sendStatus(201)

    } catch (error) {
        res.sendStatus(422)
    }

}

export async function signIn(req, res){
    const {user} = res.locals

    try {
        const db = await connectDB()
        const token = uuid()

        await registrationRepository.insertSession(user.id, token) 

        res.send(token)

    } catch (error) {
        res.send(422)
    }
}