const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeveloperSchema = new Schema({
    name: { type: String, required: true }
    
});


module.exports = DeveloperSchema;
