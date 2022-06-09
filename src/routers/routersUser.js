import { Router } from "express"
import { listDataUser, listUsers } from "../controllers/controllerUser.js"
import { validateToken } from "../middlewares/validateUrls.js"

const routersUser = Router()

routersUser.get("/users/:id", validateToken, listDataUser)
routersUser.get("/ranking", listUsers)


export default routersUser