const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DeveloperSchema = require('./developer');

const GameSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true },
    platform: { type: String, required: true },
    releasedate: {type: Date, required: true},
    developers: [DeveloperSchema]
});

const Game = mongoose.model('game', GameSchema);

module.exports = Game;
