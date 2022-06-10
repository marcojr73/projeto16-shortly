import connectDB from "../config/bank.js"
import { userRepository } from "../repositories/repositoryUser.js"

export async function listDataUser(req, res){
    
    const {id} =  req.params

    try {
        const dataUser = await userRepository.getDataUser(id)
        
        const dataUrls = await userRepository.getDataUrls(id)
        
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
        res.status(404).send("Usuário não encontrado")
    }
}

export async function listUsers(req, res){
    
    try {
        const db = await connectDB()
        const list = await userRepository.listUrls()

        res.send(list.rows)
    } catch (error) {
        res.sendStatus(404)
    }

}

