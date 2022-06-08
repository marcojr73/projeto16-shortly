import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import routerRegistration from "./routers/routersRegistration.js"
import routersUser from "./routers/routersUser.js"
import routersUrl from "./routers/routersUrl.js"


const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

app.use(routerRegistration)
app.use(routersUser)
app.use(routersUrl)


const {PORT} = process.env
app.listen(PORT, ()=> {
    console.log("SERVER UP ON PORT ", PORT)
})