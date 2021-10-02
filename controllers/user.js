////////////////////////////////////////////////
// Dependencies
////////////////////////////////////////////////
const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

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
    const { username, password } = req.body
    User.findOne({username}, async (err, user) => {
        if (err) res.send("USER DOES NOT EXIST")
        const result = await bcrypt.compare(password, user.password)
        if (!result) res.send("USER DOES NOT EXIST")
        req.session.loggedIn = true
        req.session.username = username
        res.redirect("/animals")
    })
})

// Logout
router.get("/logout", (req,res) => {
    req.session.destroy((err) => {
        res.redirect("/")
    })
})

////////////////////////////////////////////////
// Export
////////////////////////////////////////////////
module.exports = router