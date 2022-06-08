import connectDB from "../config/bank.js"
import dayjs from "dayjs"

export async function signUp(req, res){

    const {name, email, password} = req.body
    const date = dayjs().format('DD/MM/YYYY') 
    
    const db = await connectDB()

    try {
        await db.query(`INSERT INTO users (name, email, password, createdAt) 
                        VALUES ($1, $2, $3, $4);`,
                        [name, email, password, date])

        const users = await db.query("SELECT * FROM users;")
        res.send(users.rows)

    } catch (error) {
        res.send("FOI NN")
    }

}

export async function signIn(req, res){

}