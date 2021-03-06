////////////////////////////////////////////////
// Dependencies
////////////////////////////////////////////////
require("dotenv").config()
const mongoose = require("mongoose")

////////////////////////////////////////////////
// Database
////////////////////////////////////////////////
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(DATABASE_URL, CONFIG)

mongoose.connection
    .on("open", () => console.log("Connected"))
    .on("close", () => console.log("Disconnected"))
    .on("error", (err) => console.log(err))

////////////////////////////////////////////////
// Export
////////////////////////////////////////////////
module.exports = mongoose