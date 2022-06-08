import connectDB from "../config/bank.js"
import bcrypt from "bcrypt"

export async function validateUser(req, res, next){
    const {email, password} = req.body

    try {

        const db = await connectDB()
        const user = await db.query(`SELECT * FROM users WHERE email=$1`,[email])
        
        const passCorrect = bcrypt.compareSync(password, user.rows[0].password)

        if(passCorrect){
            res.locals.user = user.rows[0]
            return next()
        }

        res.send("senha incorreta")
        
    } catch (error) {
        console.log(error)
        res.send("usuário não esta cadastrado no sistema")
    }
}