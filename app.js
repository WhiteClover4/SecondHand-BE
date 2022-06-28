require('dotenv').config();
const express     = require('express');
const routes      = require('./routes/index.route');
const app         = express();
const logger      = require('morgan');
const cors        = require('cors');

app.use(cors({ credentials: true, origin: ["http://localhost:3000", "https://secondhand-binar-staging.herokuapp.com", "https://secondhand-binar.netlify.app"] }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${process.env.BASE_URL}`, routes);
app.use((err, req, res, next) => {
    console.log(err);
    if (err === 'App tidak lengkap') {
        res.status(400).json({
            status: 'Bad Request',
            msg: err
        })
    } else if (err === `Gagal membuat App baru`) {
        res.status(400).json({
            status: 'Not Found',
            msg: err.message
        });
    } 
    else {
        res.status(500).json({
            status: err.name,
            msg: err.message
        });
    }
  
  })



module.exports = app;