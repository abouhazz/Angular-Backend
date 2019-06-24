const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Game = mongoose.model('game');

describe('Charachter controller', () => {
    it('POST to api/charachters creates a charachter', done => {
        const game = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4',releasedate: "2015-03-25",});
    
        Promise.all([game.save()])
            .then(() => {
                request(app)
                    .post('/api/games/' + game._id + '/charachters')
                    .send({name: 'Trevor', level: 20})
                    .end((err, response) => {
                        assert(response.status === 200);
                        done();
                    });
                });
            });

    it('GET to api/charachters retrieves all charachters', done => {
        const game = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4',releasedate: "2015-03-25" , charachters: [{ name: 'Trevor', level:9000 }, { name: 'Michael', level:9000 }]});
            
        Promise.all([game.save()])
            .then(() => {
                request(app)
                    .get('/api/games/' + game._id + '/charachters')
                    .end((err, response) => {
                        assert(response.body.length === 2);
                        done();
                    });
                });
            });

    it('GET to api/charachters retrieves a specific charachters', done => {
        const game = new Game({ name: 'testGame', description: 'testDescription',  platform: 'PS4', releasedate: "2015-03-25" ,charachters: [{ name: 'Trevor', level:9000 }, { name: 'Michael', level:9000 }]});
                    
        Promise.all([game.save()])
                    .then(() => {
                        request(app)
                            .get('/api/games/' + game._id + '/charachters/' + game.charachters[0]._id)
                            .end((err, response) => {
                                assert(response.body.name === 'Trevor');
                                done();
                            });
                        });
                    });
    it('PUT to api/charachters edits a charachter', done => {
        const game = new Game({ name: 'testGame', description: 'testDescription'  , platform: 'PS4',releasedate: "2015-03-25" , charachters: [{ name: 'Trevor', level:9000 }, { name: 'Michael', level:9000 }]});
                            
        Promise.all([game.save()])
        .then(() => {
            request(app)
            .put('/api/games/' + game._id + '/charachters/' + game.charachters[0]._id)
            .send({name : 'EditCHarachter'})
            .end(() => {
                Game.findOne({ name: 'testGame' })
                .then((game) => {
                    assert(game.charachters[0].name === 'EditCHarachter');
                    done();
                });
            });
        });
    });

    it('DELETE to api/charachter deletes a charachter', done => {
        const game = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4',releasedate: "2015-03-25" , charachters: [{ name: 'Trevor', level:9000 }, { name: 'Michael', level:9000 }]});
                            
        Promise.all([game.save()])
        .then(() => {
            request(app)
            .delete('/api/games/' + game._id + '/charachter/' + game.charachters[0]._id)
            .end((err, response) => {
                assert(response.status === 200);
                done();
            });
        });
    });


})