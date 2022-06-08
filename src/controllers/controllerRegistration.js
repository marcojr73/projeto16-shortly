import connectDB from "../config/bank.js"
import bcrypt from "bcrypt"
import dayjs from "dayjs"

export async function signUp(req, res){

    const {name, email, password} = req.body
    const date = dayjs().format('DD/MM/YYYY') 
    const passCripty = bcrypt.hashSync(password, 10)
    
    const db = await connectDB()

    try {
        await db.query(`INSERT INTO users (name, email, password, "createdAt") 
                        VALUES ($1, $2, $3, $4);`,
                        [name, email, passCripty, date])

        const users = await db.query("SELECT * FROM users;")
        res.send(201)

    } catch (error) {
        res.sendStatus(422)
    }

}

export async function signIn(req, res){

}