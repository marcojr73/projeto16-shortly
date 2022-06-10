import connectDB from "../config/bank.js"

const db = await connectDB()

async function getUser(token) {
    return db.query(`SELECT users.id from sessions
                     JOIN users ON users.id = sessions."userId"
                     WHERE token=$1`, [token])

}

async function insertUrl(id, url, hash){
    return db.query(`INSERT INTO urls ("userId", "urlDefault", "urlShorted") 
                     VALUES ($1, $2, $3)`,[id, url, hash])
}

async function getUrl(id){
    return db.query(`SELECT id, "urlShorted", "urlDefault", "userId" FROM urls WHERE id=$1`,[id])
}

async function getUrlShort(urlShorted){
    return db.query(`SELECT "urlDefault", views FROM urls WHERE "urlShorted"=$1`,[urlShorted])
}

async function updateViews(views, urlShorted){
    return db.query(`UPDATE urls SET views=$1 WHERE "urlShorted"=$2`,[views, urlShorted])
}

async function deleteUrl(id){
    return db.query(`DELETE FROM urls WHERE id=$1`,[id])
}

export const urlsRepository = {
    getUser,
    insertUrl,
    getUrl,
    getUrlShort,
    updateViews,
    deleteUrl
}