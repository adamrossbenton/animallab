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
app.get("/animals/new", (req,res) => {
    res.render("animals/new.ejs")
})


// Destroy



// Update
app.put("/animals/:id", (req,res) => {
    const id = req.params.id
    req.body.extinct = req.body.extinct === "on"? true : false
    Animal.findByIdAndUpdate(id, req.body, {new: true}, (err,animal) => {
        res.redirect("/animals")
    } )
})


// Create
app.post("/animals", (req,res) => {
    Animal.create(req.body, (err,animal) => {
        res.redirect("/animals")
    })
})


// Edit
app.get("/animals/:id/edit", (req,res) => {
    const id = req.params.id
    Animal.findById(id, (err,animal) => {
        res.render("animals/edit.ejs", {animal})
    })
})


// Send
app.get("/animals/:id", (req,res) => {
    const id = req.params.id
    Animal.findById(id, (err,animal) => {
        res.render("animals/show.ejs", {animal})
    })
})

////////////////////////////////////////////////
// Listener
////////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => {console.log(`listening on ${PORT}`)})