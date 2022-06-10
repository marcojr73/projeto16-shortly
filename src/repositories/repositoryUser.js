import connectDB from "../config/bank.js"

const db = await connectDB()

async function getUser(id){
    return db.query(`SELECT * FROM urls WHERE "userId"=$1`,[id])
}

async function getName(id){
    return db.query(`SELECT * FROM users WHERE id=$1`,[id])
}

async function getDataUser(id){
    return db.query(`
                    SELECT urls."userId" AS id, users.name, SUM(urls.views) AS "visitCount"
                    FROM urls
                    JOIN users ON urls."userId" = users.id
                    WHERE "userId"=$1
                    GROUP BY "userId", users.name
                    `,[id])
}

async function getDataUrls(id){
    return db.query(`
                    SELECT id, "urlShorted" AS "shortUrl", "urlDefault" AS url, views AS "visitCount" 
                    FROM urls
                    WHERE urls."userId"=$1`,[id])
}

async function listUrls(){
    return db.query(`
                    SELECT users.id, users.name, COUNT(users.id) AS "linksCount", SUM(urls.views) AS "visitCount"
                    FROM urls
                    JOIN users ON urls."userId"=users.id
                    GROUP BY users.id 
                    ORDER BY "visitCount" DESC
                    LIMIT 10`)
}

export const userRepository = {
    getUser,
    getName,
    getDataUser,
    getDataUrls,
    listUrls
}