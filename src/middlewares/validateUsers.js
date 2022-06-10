import connectDB from "../config/bank.js";

export async function sendDataUser(req, res, next){
    const {id} =  req.params
    try {
        const db = await connectDB()
        const user = await db.query(`SELECT * FROM urls WHERE "userId"=$1`,[id])

        if(user.rows.length === 0) {
            
            const name = await db.query(`SELECT * FROM users WHERE id=$1`,[id])
            
            if(name.rows.length === 0){
                return res.status(404).send("Usuário não cadastrado")
            }
            
            const data = {
                id,
                name: name.rows[0].name,
                visitCount: 0,
                shortenedUrls:[]
            }
            return res.send(data)
        }     
        next()
    } catch (error) {
        res.sendStatus(404)
    }
}