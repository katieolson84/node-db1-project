const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
// const helmet = require ('helmet');
const server = express();

// pull in routes
const accountRouter = require('./accounts/accounts-router');

//use
server.use(express.json());
server.use(morgan('dev'));
// server.use(helmet());
server.use(cors());

server.use('/api/accounts', accountRouter)

server.use("/", (req,res) => {
    res.json("API data")
})

server.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack,
        custom: "Something is terribly wrong"
    })
})

module.exports = server;
