const express = require("express")
const router = express.Router()
const PokerGames = require("../models/PokerGames")

router.get("/", function(req, res){
  PokerGames.find().then(function(games){
  res.render("index", {
    games: games
    })
  })
})

router.get("/games/new", function(req, res){
  res.render("new")
})

router.post("/games", function(req, res) {
  const name = req.body.gameName
  const location = req.body.playedIn
  const cardsDealt = req.body.cardsDealt
  const game = new PokerGames()
  game.game = name
  game.mostlyPlayedIn = location
  game.cardsDealtToPlayer = cardsDealt
  game.save().then(function(game) {
      res.redirect("/")
    })
    .catch(function(error) {
      console.log("error", error)
      res.render("new", {
        game: game,
        errors: error.errors
    })
  })
})

router.post("/games/:id", function(req, res) {
  PokerGames.findOne({ _id: req.params.id }).then(function(game) {
    const name = req.body.gameName
    const location = req.body.playedIn
    const cardsDealt = req.body.cardsDealt
    game.game = name
    game.mostlyPlayedIn = location
    game.cardsDealtToPlayer = cardsDealt
    game.save().then(function(game) {
        res.redirect("/")
      })
      .catch(function(error) {
        console.log("error", error)
        res.render("edit", {
          game: game,
          errors: error.errors
      })
    })
  })
})

router.get("/games/:id", function(req, res) {
  PokerGames.findOne({_id: req.params.id}).then(function(game) {
    res.render("detail", {
      game: game
    })
  })
})

router.get("/games/:id/edit", function(req, res){
  PokerGames.findOne({_id: req.params.id}).then(function(game) {
    res.render("edit", {
      game: game
    })
  })
})

router.get("/games/:id/delete", function(req, res){
  PokerGames.deleteOne({_id: req.params.id}).then(function(game) {
    res.redirect("/")
  })
})

module.exports = router
