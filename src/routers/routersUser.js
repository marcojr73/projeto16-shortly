import { Router } from "express"
import { listDataUser, listUsers } from "../controllers/controllerUser.js"

const routersUser = Router()

routersUser.get("./users/:id", listDataUser)
routersUser.get("./users/ranking", listUsers)


export default routersUser