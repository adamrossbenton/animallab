////////////////////////////////////////////////
// Dependencies
////////////////////////////////////////////////
const express = require("express")
const animal = require("../models/animal.js")

////////////////////////////////////////////////
// Router
////////////////////////////////////////////////
const router = express.Router()

////////////////////////////////////////////////
// ROUTES
////////////////////////////////////////////////
// Index
router.get("/", (req,res) => {
    Animal.find({}, (err,animals) => {
        res.render("animals/index.ejs", {animals})
    })
})

// New
router.get("/new", (req,res) => {
    res.render("animals/new.ejs")
})


// Destroy
router.delete("/:id", (req,res) => {
    const id = req.params.id
    Animal.findByIdAndRemove(id, (err,animal) => {
        res.redirect("/animals")
    })
})


// Update
router.put("/:id", (req,res) => {
    const id = req.params.id
    req.body.extinct = req.body.extinct === "on"? true : false
    Animal.findByIdAndUpdate(id, req.body, {new: true}, (err,animal) => {
        res.redirect("/animals")
    } )
})


// Create
router.post("/", (req,res) => {
    Animal.create(req.body, (err,animal) => {
        res.redirect("/animals")
    })
})


// Edit
router.get("/:id/edit", (req,res) => {
    const id = req.params.id
    Animal.findById(id, (err,animal) => {
        res.render("animals/edit.ejs", {animal})
    })
})


// Send
router.get("/:id", (req,res) => {
    const id = req.params.id
    Animal.findById(id, (err,animal) => {
        res.render("animals/show.ejs", {animal})
    })
})

////////////////////////////////////////////////
// Export
////////////////////////////////////////////////
module.exports = router