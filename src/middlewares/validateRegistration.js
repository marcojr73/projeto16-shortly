import joi from 'joi'

export async function validatePass(req, res, next){
    const {password, confirmPassword} = req.body
    if(password==confirmPassword){
        next()
    } else {
        return res.send("as senhas não são iguais")
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
        if(error.isJoi){
            console.log(error)
            return res.send("erro no formato dos dados enviados")
        }
        res.send(error)
    }

}

