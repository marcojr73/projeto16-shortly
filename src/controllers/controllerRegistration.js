import connectDB from "../config/bank.js"
import bcrypt from "bcrypt"
import dayjs from "dayjs"
import { v4 as uuid } from 'uuid'

export async function signUp(req, res){

    const {name, email, password} = req.body
    const date = dayjs().format('DD/MM/YYYY') 
    const passCripty = bcrypt.hashSync(password, 10)
    
    try {

        const db = await connectDB()
        await db.query(`INSERT INTO users (name, email, password, "createdAt") 
                        VALUES ($1, $2, $3, $4);`,
                        [name, email, passCripty, date])

        const users = await db.query("SELECT * FROM users;")
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

        await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`,[user.id, token])

        res.send(token)

    } catch (error) {
        res.send(422)
    }
}