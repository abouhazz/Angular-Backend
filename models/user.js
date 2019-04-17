const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true},
    name: { type: String, required: true },
    password: { type: String, required: true }
});

UserSchema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

UserSchema.methods.isValid = function(hashedPassword) {
    return bcrypt.compareSync(hashedPassword, this.password);
}

const User = mongoose.model('user', UserSchema);

module.exports = User;
