const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const User = mongoose.model('user');

describe('User controller', () => {
    it('POST to api/register creates a new account', (done) => {
        request(app)
            .post('/api/register')
            .send({ email: 'user@gmail.com', name: 'Jan Piet', password: 'wachtwoord' })
            .end((err, response) => {
                    assert(response.status === 200);
                    done();
                });
            });
        

        it('POST to api/login logs an account in', done => {
            const user = new User({email: 'user2@gmail.com', name: 'Jan Piet', password: 'wachtwoord'});

            Promise.all([user.save()])
            .then(() => {
            request(app)
                .post('/api/login')
                .send({ email: 'user2@gmail.com', password: 'wachtwoord' })
                .end((err, response) => {
                    assert(response.status, 200);
                    done();
                });
            });
        });
    });