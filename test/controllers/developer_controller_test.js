const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Game = mongoose.model('game');
const Developer = require('../../models/developer')

describe('Developer controller', () => {
    it('POST to api/developers creates a developer', done => {
        request(app)
            .post('/api/register')
            .send({ email: 'testende@hotmail.com', password: 'test', name: 'test' })
            .then(() => {
                request(app)
                    .post('/api/login')
                    .send({ email: 'testende@hotmail.com', password: 'test' })
                    .then((response) => {
                        const token = response.body.token;
                        request(app)
                            .post('/api/games')
                            .set('Authorization', 'Bearer ' + token)
                            .send({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25" })
                            .then((gamedate) => {
                                const data = gamedate.body._id;
                                request(app)
                                    .post('/api/games/' + data + "/developers")
                                    .set('Authorization', 'Bearer ' + token)
                                    .send({ name: 'Rockstar' })
                                    .end((err, response) => {
                                        assert(response.body.name === 'Rockstar');
                                        done();
                                    })
                            })

                    })
            })
    });


    it('GET to api/developers retrieves all developer', done => {
        request(app)
            .post('/api/register')
            .send({ email: 'testende@hotmail.com', password: 'test', name: 'test' })
            .then(() => {
                request(app)
                    .post('/api/login')
                    .send({ email: 'testende@hotmail.com', password: 'test' })
                    .then((response) => {
                        const token = response.body.token;
                        request(app)
                            .post('/api/games')
                            .set('Authorization', 'Bearer ' + token)
                            .send({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25" })
                            .then((gamedate) => {
                                const data = gamedate.body._id;
                                request(app)
                                    .post('/api/games/' + data + "/developers")
                                    .set('Authorization', 'Bearer ' + token)
                                    .send({ name: 'Rockstar' })
                                    .then(() => {
                                        request(app)
                                            .post('/api/games/' + data + "/developers")
                                            .set('Authorization', 'Bearer ' + token)
                                            .send({ name: 'EA' })
                                            .then(() => {
                                                request(app)
                                                    .get('/api/games/' + data + "/developers")
                                                    .set('Authorization', 'Bearer ' + token)
                                                    .end((err, response) => {
                                                        assert(response.body.length == 2);
                                                        done();
                                                    })
                                            })
                                    })
                            })
                    })
            })
    });

    it('GET to api/developers retrieves a specific developer', done => {
        const game = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25", developers: [{ name: 'Rockstar' }] })
        Promise.all([game.save()])
        request(app)
            .post('/api/register')
            .send({ email: 'testende@hotmail.com', password: 'test', name: 'test' })
            .then(() => {
                request(app)
                    .post('/api/login')
                    .send({ email: 'testende@hotmail.com', password: 'test' })
                    .then((response) => {
                        const token = response.body.token;
                        request(app)
                            .post('/api/games')
                            .set('Authorization', 'Bearer ' + token)
                            .send({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25" })
                            .then((gamedate) => {
                                const data = gamedate.body._id;
                                request(app)
                                    .post('/api/games/' + data + "/developers")
                                    .set('Authorization', 'Bearer ' + token)
                                    .send({ name: 'EA' })
                                    .then(() => {
                                        Game.findOne({ name: 'testGame' })
                                            .then((game1) => {
                                                //console.log(game1.developers[0]._id)
                                                request(app)
                                                    .get('/api/games/' + data + "/developers/" + game1.developers[0]._id)
                                                    .set('Authorization', 'Bearer ' + token)
                                                    .end((err, response) => {
                                                        assert(response.status === 200);
                                                        done();
                                                    })
                                            })
                                    })
                            })
                    })
            })
    })

    it('PUT to api/developers edits a developer', done => {
        const game = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25", developers: [{ name: 'Rockstar' }] })
        Promise.all([game.save()])
        request(app)
            .post('/api/register')
            .send({ email: 'testende@hotmail.com', password: 'test', name: 'test' })
            .then(() => {
                request(app)
                    .post('/api/login')
                    .send({ email: 'testende@hotmail.com', password: 'test' })
                    .then((response) => {
                        const token = response.body.token;
                        request(app)
                            .post('/api/games')
                            .set('Authorization', 'Bearer ' + token)
                            .send({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25" })
                            .then((gamedate) => {
                                const data = gamedate.body._id;
                                request(app)
                                    .post('/api/games/' + data + "/developers")
                                    .set('Authorization', 'Bearer ' + token)
                                    .send({ name: 'EA' })
                                    .then(() => {
                                        Game.findOne({ name: 'testGame' })
                                            .then((game1) => {
                                                //console.log(game1.developers[0]._id)
                                                request(app)
                                                    .put('/api/games/' + data + "/developers/" + game1.developers[0]._id)
                                                    .set('Authorization', 'Bearer ' + token)
                                                    .send({ name: 'FA' })
                                                    .end((err, response) => {
                                                        //console.log(response.body)
                                                        assert(response.status === 200);
                                                        done();
                                                    })
                                            })
                                    })
                            })
                    })
            })
    })

    it('DELETE to api/developers deletes a developer', done => {
        const game = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25", developers: [{ name: 'Rockstar' }] })
        Promise.all([game.save()])
        request(app)
            .post('/api/register')
            .send({ email: 'testende@hotmail.com', password: 'test', name: 'test' })
            .then(() => {
                request(app)
                    .post('/api/login')
                    .send({ email: 'testende@hotmail.com', password: 'test' })
                    .then((response) => {
                        const token = response.body.token;
                        request(app)
                            .post('/api/games')
                            .set('Authorization', 'Bearer ' + token)
                            .send({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25" })
                            .then((gamedate) => {
                                const data = gamedate.body._id;
                                request(app)
                                    .post('/api/games/' + data + "/developers")
                                    .set('Authorization', 'Bearer ' + token)
                                    .send({ name: 'EA' })
                                    .then(() => {
                                        Game.findOne({ name: 'testGame' })
                                            .then((game1) => {
                                                //console.log(game1.developers[0]._id)
                                                request(app)
                                                    .delete('/api/games/' + data + "/developers/" + game1.developers[0]._id)
                                                    .set('Authorization', 'Bearer ' + token)
                                                    .end((err, response) => {
                                                        assert(response.status === 200);
                                                        done();
                                                    })
                                            })
                                    })
                            })
                    })
            })
    })
})