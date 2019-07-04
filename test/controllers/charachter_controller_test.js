const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Game = mongoose.model('game');
const Charachter = require('../../models/charachter')

describe('Charachter controller', () => {
    it('POST to api/charachter creates a charachter', done => {
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
                                    .post('/api/games/' + data + "/charachters")
                                    .set('Authorization', 'Bearer ' + token)
                                    .send({ name: 'Trevor', level: 20 })
                                    .end((err, response) => {
                                        assert(response.body.name === 'Trevor');
                                        done();
                                    })
                            })

                    })
            })
    });


    it('GET to api/charachter retrieves all charachter', done => {
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
                                    .post('/api/games/' + data + "/charachters")
                                    .set('Authorization', 'Bearer ' + token)
                                    .send({ name: 'Trevor', level: 20 })
                                    .then(() => {
                                        request(app)
                                            .post('/api/games/' + data + "/charachters")
                                            .set('Authorization', 'Bearer ' + token)
                                            .send({ name: 'Michael', level: 20})
                                            .then(() => {
                                                request(app)
                                                    .get('/api/games/' + data + "/charachters")
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

    it('GET to api/charachter retrieves a specific charachter', done => {
        const game = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25", charachters: [{ name: 'Mike', level: 25 }] })
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
                                    .post('/api/games/' + data + "/charachters")
                                    .set('Authorization', 'Bearer ' + token)
                                    .send({ name: 'Trevor', level: 20  })
                                    .then(() => {
                                        Game.findOne({ name: 'testGame' })
                                            .then((game1) => {
                                                //console.log(game1.charachters[0]._id)
                                                request(app)
                                                    .get('/api/games/' + data + "/charachters/" + game1.charachters[0]._id)
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

    it('PUT to api/charachter edits a charachter', done => {
        const game = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25", charachters: [{ name: 'Mike', level: 25 }] })
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
                            .send({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25" , developers: [{ name: 'Rockstar' }]})
                            .then((gamedate) => {
                                const data = gamedate.body._id;
                                request(app)
                                    .post('/api/games/' + data + "/charachters")
                                    .set('Authorization', 'Bearer ' + token)
                                    .send({ name: 'Paco', level: 20 })
                                    .then(() => {
                                        Game.findOne({ name: 'testGame' })
                                            .then((game1) => {
                                                //console.log(game1.charachters[0]._id)
                                                request(app)
                                                    .put('/api/games/' + data + "/charachters/" + game1.charachters[0]._id)
                                                    .set('Authorization', 'Bearer ' + token)
                                                    .send({ name: 'Mike', level: 220 })
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

    it('DELETE to api/charachter deletes a charachter', done => {
        const game = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25", charachters: [{ name: 'Mike', level: 25 }]})
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
                                    .post('/api/games/' + data + "/charachters")
                                    .set('Authorization', 'Bearer ' + token)
                                    .send({ name: 'Trevor', level: 20  })
                                    .then(() => {
                                        Game.findOne({ name: 'testGame' })
                                            .then((game1) => {
                                                console.log(game1.charachters[0]._id)
                                                request(app)
                                                    .delete('/api/games/' + data + "/charachters/" + game1.charachters[0]._id)
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