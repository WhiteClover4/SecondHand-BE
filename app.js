require('dotenv').config();
const express     = require('express');
const routes      = require('./routes/index.route');
const app         = express();
const logger      = require('morgan');
const cors        = require('cors');

app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${process.env.BASE_URL}`, routes);
app.use((err, req, res, next) => {
    console.log(err);
    if (err === 'App tidak lengkap') {
        res.status(400).json({
            status: 'Bad Request',
            message: err
        })
    } else if (err === `Gagal membuat App baru`) {
        res.status(400).json({
            status: 'Not Found',
            message: err.message
        });
    } 
    else {
        res.status(500).json({
            status: err.name,
            message: err.message
        });
    }
  
  })



module.exports = app;