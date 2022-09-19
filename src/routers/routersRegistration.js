import { Router } from "express"
import { signIn, signUp } from "../controllers/controllerRegistration.js"
import { validateUser } from "../middlewares/validateLogin.js"
import { validateData, validateMail, validatePass } from "../middlewares/validateRegistration.js"

const routersRegistration = Router()

routersRegistration.post("/sign-up",validatePass, validateMail, validateData, signUp)
routersRegistration.post("/sign-in",validateUser, signIn)

export default routersRegistration