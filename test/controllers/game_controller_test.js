const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Game = mongoose.model('game');
const User = mongoose.model('user');

describe('Game controller', () => {
    it('POST to api/games creates a new game',done => {
        const test = new User({ email : 'testende@hotmail.com',password : 'test', name:'test'});
        //const game = new Game ({name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25", user: user.userData.userId})

        request(app)
        .post('/api/register')
        .send(test)
        .then(()=>{
            request(app)
            .post('/api/login')
            .send({ email : 'testende@hotmail.com',password : 'test' })
            .then((response)=>{
                const token = response.body.token;
                request(app)
                .post('/api/games')
                .set('Authorization', 'Bearer ' + token)
                .send({name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25"})
                .end((err, response) => {
                    assert(response.body.name === 'testGame');
                    done();
                })
            })
        })
    });
            

    it('GET to api/games retrieves all games', done => {
    const test = new User({ email : 'testende@hotmail.com',password : 'test', name:'test'});
    const game1 = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25", user: test._id });
    const game2 = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25", user: test._id });

    Promise.all([game1.save(), game2.save()])
    .then(() => {
            request(app)
                .get('/api/games')
                .end((err, response) => {
                    
                    assert(response.body.length >= 2);
                    done();
                });
            })
        });
        
    it('GET to api/games retrieves a specific game', done => {
    const test = new User({ email : 'testende@hotmail.com',password : 'test', name:'test'});
    const game = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25",user: test._id });

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
        
    it('PUT to api/developers edits a developer', done => {
            const test = new User({ email : 'testende@hotmail.com',password : 'test', name:'test'});
            const game = new Game({ name: 'testGame', description: 'testDescription'  , platform: 'PS4',releasedate: "2015-03-25", user: test._id});
                                        
            Promise.all([test.save(),game.save()])
            .then(() => {
                request(app)
                        .put('/api/games/' + game._id)
                        .send({name: 'izan', description: 'testDescription'  , platform: 'PS4',releasedate: "2015-03-25",user: test._id })
                        .end((err, response) => {
                            console.log(response.body)
                            assert(response.status === 200);
                            done();
                         });
                    });
                });
                

    // it('DELETE to api/games deletes a specific game', done => {
    //     const game = new Game({ name: 'testGame', description: 'testDescription', platform: 'PS4', releasedate: "2015-03-25" });
        
    //     Promise.all([game.save()])
    //     .then(() => {
    //         request(app)
    //             .delete('/api/games/' + game._id)
    //             .end((err, response) => {
    //                 assert(response.status === 200);
    //                 done();
    //             });
    //         });


    //     });
    
    });

