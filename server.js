////////////////////////////////////////////////
// Dependencies
////////////////////////////////////////////////
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const Animal = require("./models/animal")
// const AnimalRouter = require("./controllers/animals")

const app = express()

////////////////////////////////////////////////
// Middleware
////////////////////////////////////////////////
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
// app.use("/animals", AnimalRouter)

////////////////////////////////////////////////
// Routes (will go to Controllers)
////////////////////////////////////////////////
// Index
app.get("/animals", (req,res) => {
    Animal.find({}, (err,animals) => {
        res.render("animals/index.ejs", {animals})
    })
})

// New



// Destroy



// Update



// Create



// Edit



// Send
app.get("/animals/:id", (req,res) => {
    const id = req.params.id
    Animal.findById(id, (err,animals) => {
        res.render("animals/show.ejs", {animal})
    })
})

////////////////////////////////////////////////
// Listener
////////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => {console.log(`listening on ${PORT}`)})