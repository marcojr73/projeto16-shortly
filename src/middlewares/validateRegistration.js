import joi from 'joi'
import connectDB from '../config/bank.js'
import { registrationRepository } from '../repositories/repositoryRegistration.js'

export async function validatePass(req, res, next){
    const {password, confirmPassword} = req.body
    if(password==confirmPassword){
        next()
    } else {
        return res.status(422).send("As senhas digitadas não conferem")
    }

}

export async function validateData(req, res, next){
    try {
        const schemaData = joi.object({
            name: joi.string().min(3).required(),
            email: joi.string().email().min(5).required(),
            password: joi.required(),
            confirmPassword: joi.required()
        })
        
        const validate = await schemaData.validateAsync(req.body)
        next()
    } catch (error) {
        res.status(422).send("Dados enviados fora do padrão esperado")
    }

}

export async function validateMail(req, res, next){

    const {email} = req.body
    try {
        const db = await connectDB()
        const validate = await registrationRepository.searchEmail(email)
        if(validate.rows.length !== 0) return res.status(422).send("Este endereço de email já esta sendo usado")
        next()
    } catch (error) {
        console.log(error)
        res.sendStatus(422)
    }

}

