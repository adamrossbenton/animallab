////////////////////////////////////////////////
// Dependencies
////////////////////////////////////////////////
const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const { application } = require("express")

////////////////////////////////////////////////
// Router
////////////////////////////////////////////////
const router = express.Router()

////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////
// Signup
router.get("/signup", (req,res) => {
    res.render("user/signup.ejs")
})

router.post("/signup", async (req,res) => {
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    User.create(req.body, (err,user) => {
        res.redirect("/user/login")
    })
})

// Login
router.get("/login", (req,res) => {
    res.render("user/login.ejs")
})

router.post("/login", (req,res) => {
    // use same error message for both incorrect user/pword
    // make it harder to brute force
    const inc = "USERNAME OR PASSWORD IS INCORRECT"
    const {username, password} = req.body
    User.findOne({username}, async (err,user) => {
        if (err) res.send(inc)
        const result = await bcrypt.compare(password, user.password)
        if (!result) res.send(inc)
        res.redirect("/animals")
    })
})

////////////////////////////////////////////////
// Export
////////////////////////////////////////////////
module.exports = router