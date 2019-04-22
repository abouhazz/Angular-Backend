const UserController = require('../contollers/user_controller')
const DeveloperController = require('../contollers/developer_controller')
const GameController = require('../contollers/game_contoller')
const token = require('../middleware/auth_token')

module.exports = (app)=>{

    if (process.env.NODE_ENV !== 'test'){

    app.post('/api/register',UserController.register)
    app.post('/api/login', UserController.login)


    app.post('/api/games', token, GameController.createGame)
    app.get('/api/games', token, GameController.getAllGames)
    app.get('/api/games/:gameid', token, GameController.getGameById)
    app.put('/api/games/:gameid', token, GameController.editGame)
    app.delete('/api/games/:gameid', token, GameController.deleteGame)

    app.post('/api/games/:gameid/developers', token, DeveloperController.createDeveloper)
    app.get('/api/games/:gameid/developers', token,DeveloperController.getAllDevelopers)
    app.get('/api/games/:gameid/developers/:developerid', token, DeveloperController.getDeveloperById)
    app.put('/api/games/:gameid/developers/:developerid', token, DeveloperController.editDeveloper)
    app.delete('/api/games/:gameid/developers/:developerid', token, DeveloperController.deleteDeveloper)
    }

    else{
    app.post('/api/register',UserController.register)
    app.post('/api/login', UserController.login)


    app.post('/api/games',  GameController.createGame)
    app.get('/api/games',  GameController.getAllGames)
    app.get('/api/games/:gameid',  GameController.getGameById)
    app.put('/api/games/:gameid',  GameController.editGame)
    app.delete('/api/games/:gameid',  GameController.deleteGame)

    app.post('/api/games/:gameid/developers',  DeveloperController.createDeveloper)
    app.get('/api/games/:gameid/developers', DeveloperController.getAllDevelopers)
    app.get('/api/games/:gameid/developers/:developerid',  DeveloperController.getDeveloperById)
    app.put('/api/games/:gameid/developers/:developerid',  DeveloperController.editDeveloper)
    app.delete('/api/games/:gameid/developers/:developerid',  DeveloperController.deleteDeveloper)

    }
}