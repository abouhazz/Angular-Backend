const Game = require('../models/game')
const User = require('../models/user')

module.exports = {
    createGame(req, res, next){
        const games = new Game({name: req.body.name, description:req.body.description, releasedate: req.body.releasedate, platform:req.body.platform, user: req.userData.userId})
        Game.create(games)
        .then(game => res.send(game))
        .catch(next);
    },

    getAllGames(req, res, next){
        Game.find().then(game => res.send(game))
        .catch(next)
    },

    getGameById(req, res, next){
        Game.findById({_id: req.params.gameid})
        .then(game => {
            if(game === null){
                res.status(404).send({Error: 'game does not exist'});
            }
            else{
                res.send(game)
            }
        }).catch(next);
    },

    editGame(req, res, next){
        Game.findOne({_id: req.params.gameid,user: req.userData.userId})
        .then(game => {
            game.name= req.body.name, game.description =req.body.description,game.releasedate= req.body.releasedate, game.platform= req.body.platform
            if(game === null){
                res.status(404).send({Error: 'game does not exist or the user is non-autherized'});
            }
            else{
                
                res.send(game);
            }
        }).catch(next);
    },

    deleteGame(req, res, next){
        Game.findOne({_id: req.params.gameid,user: req.userData.userId})
        .then(game => {
            game.delete()
            if(game === null){
                res.status(404).send({Error: 'game does not exist or the user is non-autherized'});
            }
            else{
                res.status(200).send({message: 'game is deleted' })
            }
        }).catch(next);
    },




}