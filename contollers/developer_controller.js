const Game = require('../models/game')

module.exports = {
    createDeveloper(req, res, next){
        const developer  = req.body;

        Game.findOne({_id: req.params.gameid, user: req.userData.userId})
        .then(game => {
            if(game === null){
                res.status(404).send({error: 'game does not exist'});
                }

                else{
                    game.developers.push(developer)
                    return game.save();
                }
            })
            .then(()=> res.status(200).send(developer))
            .catch(next);
        },

    getAllDevelopers(req, res, next){
        Game.findOne({_id: req.params.gameid}).then((game) => res.send(game.developers))
        .catch(next)
    },

    getDeveloperById(req, res, next){
        var developer = null;
        Game.findOne({_id: req.params.gameid})
        .then(game => {
            if(game === null){
                res.status(404).send({Error: 'game does not exist'});
            }
            else{
                game.developers.forEach(loop => {
                    if(loop._id == req.params.developerid){
                        developer = loop;
                    }
                });
                res.send(developer);
            }
        }).catch(next);
    },

    editDeveloper(req, res, next){
        Game.updateOne({_id: req.params.gameid, "developers._id": req.params.developerid, user: req.userData.userId},
            {$set: {"developers.$.name": req.body.name}})
        .then(game => {
            
            if(game === null){
                res.status(404).send({Error: 'game does not exist'});
            }
            
            else{
                
                res.send(game);
            }
        }).catch(next);
    },

    deleteDeveloper(req, res, next){
        Game.updateOne({_id: req.params.gameid, user: req.userData.userId},
            {$pull: {developers: {_id: req.params.developerid}}}
            )
        .then(game => {
            if(game === null){
                res.status(404).send({Error: 'game does not exist'});
            }
            
            if(game.user === req.userData.userId){
                res.status(200).send({message: 'developer is deleted' })
            }
        }).catch(next);
    },


}