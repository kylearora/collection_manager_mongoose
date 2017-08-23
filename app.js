const express = require("express")
const app = express()
const mustache = require("mustache-express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
mongoose.Promise = require("bluebird")
app.engine("mustache", mustache())
app.set("view engine", "mustache")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("./public"))

const MONGO_URL = "mongodb://127.0.0.1:27017/pokerGames"
mongoose.connect(MONGO_URL)

const PokerGames = require("./models/PokerGames")
const gamesRoutes = require("./routes/games")


app.use(gamesRoutes)

app.listen(3000, function() {
  console.log("Listening on 3000")
})
