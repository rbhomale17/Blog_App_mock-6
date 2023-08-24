const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    avatar: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { versionKey: false });

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;