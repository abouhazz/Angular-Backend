const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Game = mongoose.model('game');

describe('Game controller', () => {
    it('POST to api/games creates a new game', (done) => {
        request(app)
            .post('/api/games')
            .send({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25" })
            .end((err, response) => {
                    assert(response.body.name === 'testGame');
                    done();
                });
            });
            

    it('GET to api/games retrieves all games', done => {
    const game1 = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25" });
    const game2 = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25" });

    Promise.all([game1.save(), game2.save()])
        .then(() => {
            request(app)
                .get('/api/games')
                .end((err, response) => {
                    assert(response.body.length === 2);
                    done();
                });
            });
        });
        
    it('GET to api/games retrieves a specific game', done => {
    const game = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25" });

    Promise.all([game.save()])
        .then(() => {
            request(app)
                .get('/api/games/' + game._id)
                .end((err, response) => {
                    assert(response.body.name === 'testGame');
                    done();
                });
            });
        });
        
    it('PUT to api/games edits a specific game', (done) => {
    const game = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25" });

    Promise.all([game.save()])
        .then(() => {
            request(app)
                .put('/api/games/' + game._id)
                .send({ name: 'testGame', description: 'ChangedDiscription', platform: 'XBOX', releasedate: "2015-03-25" })
                .end(() => {
                    Game.findOne({name :'testGame'})
                    .then(game => {
                        assert(game.description === 'ChangedDiscription');
                        assert(game.platform === 'XBOX');
                        done();
                    })
                });
            });
        });

    it('DELETE to api/games deletes a specific game', done => {
        const game = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25" });
        
        Promise.all([game.save()])
        .then(() => {
            request(app)
                .delete('/api/games/' + game._id)
                .end((err, response) => {
                    assert(response.status === 200);
                    done();
                });
            });


        });
    
    });

