const Game = require('../models/game')

module.exports = {
    createCharachter(req, res, next){
        const charachter  = req.body;

        Game.findById({_id: req.params.gameid})
        .then(game => {
            if(game === null){
                res.status(404).send({error: 'game does not exist'});
                }

                else{
                    game.charachters.push(charachter)
                    return game.save();
                }
            })
            .then(()=> res.status(200).send(developer))
            .catch(next);
        },

    getAllCharachters(req, res, next){
        Game.findOne({_id: req.params.gameid}).then((game) => res.send(game.charachters))
        .catch(next)
    },

    getCharachterById(req, res, next){
        var charachter = null;
        Game.findOne({_id: req.params.gameid})
        .then(game => {
            if(game === null){
                res.status(404).send({Error: 'game does not exist'});
            }
            else{
                game.charachters.forEach(loop => {
                    if(loop._id == req.params.charachterid){
                        charachter = loop;
                    }
                });
                res.send(charachter);
            }
        }).catch(next);
    },

    editCharachter(req, res, next){
        Game.updateOne({_id: req.params.gameid, "charachters._id": req.params.charachterid},
            {$set: {"charachters.$.name": req.body.name, "charachters.$.level": req.body.level }})
        .then(game => {
            if(game === null){
                res.status(404).send({Error: 'game does not exist'});
            }
            else{
                res.send(game);
            }
        }).catch(next);
    },

    deleteCharachter(req, res, next){
        Game.findByIdAndUpdate({_id: req.params.gameid},
            {$pull: {developers: {_id: req.params.developerid}}}
            )
        .then(game => {
            if(game === null){
                res.status(404).send({Error: 'game does not exist'});
            }
            else{
                res.status(200).send({message: 'charachter is deleted' })
            }
        }).catch(next);
    },


}