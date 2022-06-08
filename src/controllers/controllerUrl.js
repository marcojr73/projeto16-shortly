import { nanoid } from 'nanoid/non-secure'
import connectDB from '../config/bank.js'


export async function generateUrl(req, res){
    const {url} = req.body

    const hash = nanoid(9)

    const {user} = res.locals

    try {
        const db = await connectDB()
        await db.query(`INSERT INTO urls ("userId", "urlDefault", "urlShorted") 
                        VALUES ($1, $2, $3)`,[user.id, url, hash])

        res.sendStatus(201)

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

export async function listUrl(req, res){
    
}

export async function redirectUrl(req, res){
    
}

export async function deleteUrl(req, res){
    
}