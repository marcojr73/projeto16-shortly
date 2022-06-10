import connectDB from "../config/bank.js"
import { urlsRepository } from "../repositories/repositoryurls.js"
import { schemaUrl } from "../schemas/urlsSchemas.js"

export async function validateToken(req, res, next){

    const token = req.headers.authorization?.replace("Bearer", "").trim()
    if (!token) return res.status(401).send("Token nao enviado")
    
    try {
        const db = await connectDB()

        const user = await urlsRepository.getUser(token) 

        if (user.rows[0]===undefined) return res.status(401).send("token não encontrado")

        res.locals.user = user.rows[0]
        
        next()

    } catch (error) {
        res.status(422).send("Você não enviou um token válido")
    }
    
}

export async function validateUrl(req,res, next){
    const {url} = req.body
    
    try {
        await schemaUrl.validateAsync({url})

        next()
        
    } catch (error) {
        res.status(422).send("Você não enviou uma url válida")
    }
}

export async function validateUser(req, res, next){
    const userId = res.locals.user.id
    const {id} = req.params
    
    try {

        const valid = await urlsRepository.getUrl(id)

        if(valid.rows[0].userId !== userId){
            return res.status(401).send("Esta url não pertence ao usuário")
        }

        next()

    } catch (error) {
        res.status(404).send("url não encontrada")
    }
}
