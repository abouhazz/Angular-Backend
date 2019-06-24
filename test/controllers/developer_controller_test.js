const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Game = mongoose.model('game');

describe('Developer controller', () => {
    it('POST to api/developers creates a developer', done => {
        const game = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4',releasedate: "2015-03-25" ,});
    
        Promise.all([game.save()])
            .then(() => {
                request(app)
                    .post('/api/games/' + game._id + '/developers')
                    .send({name: 'Rockstar'})
                    .end((err, response) => {
                        assert(response.status === 200);
                        done();
                    });
                });
            });

    it('GET to api/developers retrieves all developer', done => {
        const game = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4',releasedate: "2015-03-25" , developers: [{ name: 'Rockstar' }, { name: 'EA' }]});
            
        Promise.all([game.save()])
            .then(() => {
                request(app)
                    .get('/api/games/' + game._id + '/developers')
                    .end((err, response) => {
                        assert(response.body.length === 2);
                        done();
                    });
                });
            });

    it('GET to api/developers retrieves a specific developer', done => {
        const game = new Game({ name: 'testGame', description: 'testDescription',  platform: 'PS4', releasedate: "2015-03-25" ,developers: [{ name: 'Rockstar' }, { name: 'EA' }]});
                    
        Promise.all([game.save()])
                    .then(() => {
                        request(app)
                            .get('/api/games/' + game._id + '/developers/' + game.developers[0]._id)
                            .end((err, response) => {
                                assert(response.body.name === 'Rockstar');
                                done();
                            });
                        });
                    });
    it('PUT to api/developers edits a developer', done => {
        const game = new Game({ name: 'testGame', description: 'testDescription'  , platform: 'PS4',releasedate: "2015-03-25" , developers: [{ name: 'Rockstar' }, { name: 'EA' }]});
                            
        Promise.all([game.save()])
        .then(() => {
            request(app)
            .put('/api/games/' + game._id + '/developers/' + game.developers[0]._id)
            .send({name : 'EditDeveloper'})
            .end(() => {
                Game.findOne({ name: 'testGame' })
                .then((game) => {
                    assert(game.developers[0].name === 'EditDeveloper');
                    done();
                });
            });
        });
    });

    it('DELETE to api/developers deletes a developer', done => {
        const game = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4',releasedate: "2015-03-25" , developers: [{ name: 'Rockstar' }, { name: 'EA' }]});
                            
        Promise.all([game.save()])
        .then(() => {
            request(app)
            .delete('/api/games/' + game._id + '/developers/' + game.developers[0]._id)
            .end((err, response) => {
                assert(response.status === 200);
                done();
            });
        });
    });


})