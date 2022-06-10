import { Router } from "express"
import { listDataUser, listUsers } from "../controllers/controllerUser.js"
import { validateToken } from "../middlewares/validateUrls.js"
import { sendDataUser } from "../middlewares/validateUsers.js"

const routersUser = Router()

routersUser.get("/users/:id", validateToken, sendDataUser, listDataUser)
routersUser.get("/ranking", listUsers)


export default routersUser