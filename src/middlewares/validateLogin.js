import connectDB from "../config/bank.js"
import bcrypt from "bcrypt"

export async function validateUser(req, res, next){
    const {email, password} = req.body

    try {

        const db = await connectDB()
        const user = await db.query(`SELECT * FROM users WHERE email=$1`,[email])
        const passCorrect = bcrypt.compareSync(password, user.rows[0].password)

        if(!passCorrect || user.rows[0].length === undefined){
            return res.sendStatus(401)
        }
        
        res.locals.user = user.rows[0]
        next()
        
    } catch (error) {
        res.sendStatus(422)
    }
}