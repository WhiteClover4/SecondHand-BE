require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/index.route');
const logger = require('morgan');


app.use(express.json());
app.use(logger('dev'));

app.use(`${process.env.BASE_URL}`, router);



module.exports = app;