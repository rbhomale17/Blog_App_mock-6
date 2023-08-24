const express = require('express');
const UserModel = require('../models/user.model');
const registrationMiddleware = require('../middlewares/registration.middleware');
const loginMiddleware = require('../middlewares/login.middleware');
const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    try {
        let users = await UserModel.find();
        res.send({ msg: 'Welcome To User Router', users })
    } catch (error) {
        res.send({ err: error.message })
    }
});

userRouter.post('/register', registrationMiddleware, (req, res) => {
    res.status(201).send({ msg: "User registration Succesfull." })
});

userRouter.post('/login', loginMiddleware, (req, res) => {
    const { token } = req.query;
    try {
        if (!token) return res.send({ msg: "Some Error Occur Please try Again." });
        res.status(200).send({ msg: 'login successful', token })
    } catch (error) {
        res.status(429).send({ err: error.message })
    }
})

module.exports = userRouter;