const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');
require('dotenv').config();
const secretkey = process.env.secretkey;

module.exports = async function loginMiddleware(req, res, next) {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.send({ msg: "Please Provide All Details, Keys Are Case Sensetive." })

        let isPresent = await UserModel.findOne({ email });
        if (!isPresent) return res.send({ msg: 'login failed, User Not Found!' });

        bcrypt.compare(password, isPresent.password, (err, result) => {
            if (!result) return res.send({ msg: 'login failed, wrong password' });

            isPresent.password = null;
            var token = jwt.sign({ userData: isPresent }, secretkey, { expiresIn: '7h' });
            req.query.token = token;
            next();
        })
    } catch (error) {
        res.status(429).send({ err: error.message })
    }
}