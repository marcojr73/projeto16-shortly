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
    
    const {id} = req.params
    
    try {
        const db = await connectDB()
        const url = await db.query(`SELECT id, "urlShorted", "urlDefault" FROM urls WHERE id=$1`,[id])
        
        if(url.rows[0].length===undefined) return res.sendStatus(404)
        
        res.send(url.rows[0])

    } catch (error) {
        console.log(error)
    }

}

export async function redirectUrl(req, res){
    
    const {urlShorted} = req.params
    
    try {
        const db = await connectDB()
        const url = await db.query(`SELECT "urlDefault", views FROM urls WHERE "urlShorted"=$1`,[urlShorted])
        const views = url.rows[0].views + 1
        
        await db.query(`UPDATE urls SET views=$1 WHERE "urlShorted"=$2`,[views, urlShorted])
        res.redirect(url.rows[0].urlDefault)

    } catch (error) {
        console.log(error)
        res.sendStatus(404)
    }

}

export async function deleteUrl(req, res){
    
    const {id} = req.params
    
    try {
        
    } catch (error) {
        
    }


}