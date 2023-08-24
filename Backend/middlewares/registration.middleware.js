const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = +process.env.saltRounds;


module.exports = async function registrationMiddleware(req, res, next) {
    const { username, email, password, avatar } = req.body;
    try {
        if (!email || !username ||
            !password || !avatar) return res.send({ msg: "Please Provide All Details, Keys Are Case Sensetive." })

        let isEmailPresent = await UserModel.findOne({ email })
        let isUsernamePresent = await UserModel.findOne({ username })
        // console.log(isEmailPresent, isUsernamePresent)
        if (isEmailPresent || isUsernamePresent) return res.send({ msg: 'Email Or Username is already registered, Please try Different credentials.' });

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            req.body.password = hash;
            let newUser = new UserModel(req.body);
            await newUser.save();
            next();
        })

    } catch (error) {
        res.status(429).send({ err: error.message })
    }
}