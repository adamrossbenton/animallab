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
            img: "",
        },
        {
            species: "River Otter",
            extinct: false,
            location: "North America",
            lifeExpectancy: "8",
        },
        {
            species: "Emperor Penguin",
            extinct: false,
            location: "Antarctica",
            lifeExpectancy: "20",
        },
        {
            species: "Cassowary",
            extinct: false,
            location: "Australia",
            lifeExpectancy: "60",
        }
    ];
    Animal.remove({}, (err,data) => {
        Animal.create(startAnimals, (err,data) => {
            console.log("----------ANIMALS CREATED----------")
            console.log(data)
            console.log("----------ANIMALS CREATED----------")
            mongoose.connection.close()
        })
    })
})