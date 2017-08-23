const mongoose = require("mongoose")

const pokerGamesSchema = new mongoose.Schema({
  game: {type: String, required: true, unique: true},
  mostlyPlayedIn: String,
  cardsDealtToPlayer: {type: Number, required: true},
  type: [{
    format: {type: String, required: true},
    bigBet: Boolean,
    fixed: Boolean,
    splitPot: Boolean,
  }]
})

const pokerGames = mongoose.model("pokerGames", pokerGamesSchema)

module.exports = pokerGames
