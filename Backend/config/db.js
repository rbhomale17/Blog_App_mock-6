const mongoose = require('mongoose');
require('dotenv').config();

const mongoDB_url = process.env.mongoDB_url;

const connection = mongoose.connect(mongoDB_url);

module.exports = connection;