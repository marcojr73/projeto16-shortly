import connectDB from "../config/bank.js"

export async function listDataUser(req, res){
    
    const {id} =  req.params

    try {
        const db = await connectDB()
        const dataUser = await db.query(`
                                        SELECT urls."userId" AS id, users.name, SUM(urls.views) AS "visitCount"
                                        FROM urls
                                        JOIN users ON urls."userId" = users.id
                                        WHERE "userId"=$1
                                        GROUP BY "userId", users.name
        `,[id])

        const dataUrls = await db.query(`
                                        SELECT id, "urlShorted" AS "shortUrl", "urlDefault" AS url, views AS "visitCount" 
                                        FROM urls
                                        WHERE urls."userId"=$1`,[id])

        const shortenedUrls = dataUrls.rows.map(dataUrl => {
            return(
                {
                    id: dataUrl.id,
                    shortUrl: dataUrl.shortUrl,
                    url: dataUrl.url,
                    visitCount: dataUrl.visitCount
                  }
            )
        })
         
        const list = {
            id: id,
            name: dataUser.rows[0].name,
            visitCount: dataUser.rows[0].visitCount,
            shortenedUrls
        }

        res.send(list)
         
    } catch (error) {
        console.log(error)
        res.sendStatus(404)
    }


}

export async function listUsers(req, res){
    
    try {
        const db = await connectDB()
        const list = await db.query(`
                                    SELECT users.id, users.name, COUNT(users.id) AS "linksCount", SUM(urls.views) AS "visitCount"
                                    FROM urls
                                    JOIN users ON urls."userId"=users.id
                                    GROUP BY users.id 
                                    ORDER BY "visitCount" DESC
                                    LIMIT 10`)

        res.send(list.rows)
    } catch (error) {
        res.send(error)
    }

}

