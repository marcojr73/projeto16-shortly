import { Router } from "express"
import { deleteUrl, generateUrl, listUrl, redirectUrl } from "../controllers/controllerUrl.js"
import { validateToken, validateUrl, validateUser } from "../middlewares/validateUrls.js"

const routersUrl = Router()

routersUrl.post("/urls/shorten",validateUrl, validateToken, generateUrl)
routersUrl.get("/urls/:id", listUrl)
routersUrl.get("/urls/open/:urlShorted", redirectUrl)
routersUrl.delete("/urls/:id",validateToken, validateUser, deleteUrl)

export default routersUrl