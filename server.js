////////////////////////////////////////////////
// Dependencies
////////////////////////////////////////////////
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const Animal = require("./models/animal")
const AnimalRouter = require("./controllers/animal")

const app = express()

////////////////////////////////////////////////
// Middleware
////////////////////////////////////////////////
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use("/animals", AnimalRouter)

////////////////////////////////////////////////
// Listener
////////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})