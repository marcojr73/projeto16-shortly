import connectDB from "../config/bank.js"

export async function validateToken(req, res, next){

    const token = req.headers.authorization.replace("Bearer", "").trim()
    if (!token) return res.status(401).send("Token nao enviado")
    
    try {
        const db = await connectDB()

        const user = await db.query(`SELECT users.id from sessions
                                     JOIN users ON users.id = sessions."userId"
                                     WHERE token=$1`,[token])

        if (user.rows[0]===undefined) return res.status(402).send("token não encontrado")

        res.locals.user = user.rows[0]

        // res.send(user.rows[0])
        
        next()

    } catch (error) {
        console.log(error)
    }
    


    res.locals.token = token
    // res.locals.session = session

}