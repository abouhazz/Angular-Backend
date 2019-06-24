const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DeveloperSchema = require('./developer');
const CharachterSchema = require('./charachter');

const GameSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true },
    platform: { type: String, required: true },
    releasedate: {type: Date, required: true},
    developers: [DeveloperSchema],
    charachters: [CharachterSchema]
});

const Game = mongoose.model('game', GameSchema, CharachterSchema);

module.exports = Game;
