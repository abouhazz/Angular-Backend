const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharachterSchema = new Schema({
    name: { type: String, required: true },
    level: { type: number, required: true }
    
});

module.exports = CharachterSchema;