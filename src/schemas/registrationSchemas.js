import joi from "joi"

export const schemaData = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().min(5).required(),
    password: joi.required(),
    confirmPassword: joi.required()
})

export const schemaLog = joi.object({
    email: joi.string().email().min(5).required(),
    password: joi.required()
})