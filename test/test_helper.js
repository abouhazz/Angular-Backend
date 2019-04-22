const mongoose = require('mongoose');

before(done => {
    mongoose.connect('mongodb+srv://a_elbouhazzaoui:@Welkom001@cluster0-urdq2.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => done())
        .on('error', err => {
            console.warn('Warning', error);
        });
});

beforeEach(done => {
    const { users, games } = mongoose.connection.collections;
    users.drop(() => {
        games.drop(() => {
            done();
        });
    });
});