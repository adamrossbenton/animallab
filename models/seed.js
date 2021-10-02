////////////////////////////////////////////////
// Dependencies
////////////////////////////////////////////////
const mongoose = require("./connection")
const Animal = require("./animal")

////////////////////////////////////////////////
// Seed
////////////////////////////////////////////////
mongoose.connection.on("open", () => {
    const startAnimals = [
        {
            species: "African Lion",
            extinct: false,
            location: "Africa",
            lifeExpectancy: 10,
            img: "https://i.imgur.com/VhyzC.jpeg"
        },
        {
            species: "River Otter",
            extinct: false,
            location: "North America",
            lifeExpectancy: "8",
            img: "https://i.imgur.com/nfDfPlP.jpeg"
        },
        {
            species: "Emperor Penguin",
            extinct: false,
            location: "Antarctica",
            lifeExpectancy: "20",
            img: "https://i.imgur.com/PKWalc8.jpeg"
        },
        {
            species: "Cassowary",
            extinct: false,
            location: "Australia",
            lifeExpectancy: "60",
            img: "https://i.imgur.com/2DU7zxu.jpeg"
        }
    ];
    Animal.deleteMany({}, (err,data) => {
        Animal.create(startAnimals, (err,data) => {
            console.log("----------ANIMALS CREATED----------")
            console.table(data)
            console.log("----------ANIMALS CREATED----------")
            mongoose.connection.close()
        })
    })
})