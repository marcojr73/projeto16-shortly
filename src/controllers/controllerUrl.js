import { nanoid } from 'nanoid/non-secure'
import { urlsRepository } from '../repositories/repositoryurls.js'


export async function generateUrl(req, res){
    const {url} = req.body

    const hash = nanoid(9)

    const {user} = res.locals

    try {
        await urlsRepository.insertUrl(user.id, url, hash)

        res.sendStatus(201)

    } catch (error) {
        res.sendStatus(422)
    }
}

export async function listUrl(req, res){
    
    const {id} = req.params
    
    try {
        const url = await urlsRepository.getUrl(id)
        if(url.rows.length===0) return res.sendStatus(404)
        res.send(url.rows[0])

    } catch (error) {
        res.status(404).send("Url não encontrada")
    }

}

export async function redirectUrl(req, res){
    
    const urlShorted = req.params.shortUrl
    console.log(urlShorted)
    
    try {
        const url = await urlsRepository.getUrlShort(urlShorted)
        const views = url.rows[0].views + 1

        await urlsRepository.updateViews(views, urlShorted)
        res.redirect(url.rows[0].urlDefault)

    } catch (error) {
        console.log(error)
        res.status(404).send("url não encontrada")
    }

}

export async function deleteUrl(req, res){
    
    const {id} = req.params

    try {
        
        await urlsRepository.deleteUrl(id)

        res.status(204).send("Url deletada com sucesso")

    } catch (error) {
        
    }


}