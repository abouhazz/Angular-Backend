const Game = require('../models/game')

module.exports = {
    createGame(req, res, next){
        const games = new Game({name: req.body.name, description:req.body.description, platform:req.body.platform})
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
        Game.findByIdAndUpdate({_id: req.params.gameid},
            {name: req.body.name, description :req.body.description, platform: req.body.platform})
        .then(game => {
            if(game === null){
                res.status(404).send({Error: 'game does not exist'});
            }
            else{
                res.send(game);
            }
        }).catch(next);
    },

    deleteGame(req, res, next){
        Game.findByIdAndDelete({_id: req.params.gameid})
        .then(game => {
            if(game === null){
                res.status(404).send({Error: 'game does not exist'});
            }
            else{
                res.status(200).send({message: 'game is deleted' })
            }
        }).catch(next);
    },


}