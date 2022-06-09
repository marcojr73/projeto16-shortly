import { Router } from "express"
import { signIn, signUp } from "../controllers/controllerRegistration.js"
import { validateUser } from "../middlewares/validateLogin.js"
import { validateData, validateMail, validatePass } from "../middlewares/validateRegistration.js"

const routersRegistration = Router()

routersRegistration.post("/signup",validatePass, validateMail, validateData, signUp)
routersRegistration.post("/signin",validateUser, signIn)

export default routersRegistration