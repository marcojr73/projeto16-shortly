import { Router } from "express"
import { signIn, signUp } from "../controllers/controllerRegistration.js"
import { validateData, validatePass } from "../middlewares/validateRegistration.js"

const routersRegistration = Router()

routersRegistration.post("/signup",validatePass, validateData, signUp)
routersRegistration.post("/sigin", signIn)

export default routersRegistration