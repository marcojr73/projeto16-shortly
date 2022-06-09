import joi from 'joi'
import connectDB from '../config/bank.js'

export async function validatePass(req, res, next){
    const {password, confirmPassword} = req.body
    if(password==confirmPassword){
        next()
    } else {
        return res.sendStatus(422)
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
        res.sendStatus(422)
    }

}

export async function validateMail(req, res, next){

    const {email} = req.body
    try {
        const db = await connectDB()
        const validate = await db.query(`SELECT * FROM users WHERE email=$1`,[email])
        if(validate.rows.length !== 0) return res.sendStatus(422)
        next()
    } catch (error) {
        res.sendStatus(422)
    }

}

