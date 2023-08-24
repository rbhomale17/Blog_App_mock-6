const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
require('dotenv').config();
const secretkey = process.env.secretkey;

module.exports = async function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    // console.log(token)
    try {
        if (!token) return res.send({ msg: "Please Login for Blogs." })
        jwt.verify(token, secretkey, function (err, decoded) {
            if (err) return res.send({ msg: 'Please Login' })
            req.body.userData = decoded.userData;
            next();
        });
    } catch (error) {
        res.status(400).send({ err: error.message })
    }
}