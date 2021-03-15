const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const helmet = require ('helmet');
const server = express();

// pull in routes
const accountRouter = require('./accounts/accounts-router');
// const mw = require('./accounts/accounts-middleware');

//use
server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());
server.use(cors());

server.use('/api/accounts', accountRouter)

server.use("/", (req,res) => {
    res.json("API data")
})

module.exports = server;
