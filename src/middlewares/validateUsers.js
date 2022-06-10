import { userRepository } from "../repositories/repositoryUser.js"

export async function sendDataUser(req, res, next){
    const {id} =  req.params
    try {
        const user = await userRepository.getUser(id)

        if(user.rows.length === 0) {
            const name = await userRepository.getName(id)
            
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