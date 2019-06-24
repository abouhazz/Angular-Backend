const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');
const app = express();


mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb+srv://a_elbouhazzaoui:@Welkom001@cluster0-urdq2.mongodb.net/game?retryWrites=true', { useNewUrlParser: true });
    
}

app.use(cors())
app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});

module.exports = app;