import { Router } from "express"
import { deleteUrl, generateUrl, listUrl, redirectUrl } from "../controllers/controllerUrl.js"

const routersUrl = Router()

routersUrl.post("./urls/shorten", generateUrl)
routersUrl.get("./urls/:id", listUrl)
routersUrl.get("./urls/open/:shortUrl", redirectUrl)
routersUrl.delete("./urls/:id", deleteUrl)

export default routersUrl