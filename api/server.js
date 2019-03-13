const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const userRouter = require('./routers/userRouter.js');
const categoryRouter = require('./routers/categoryRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors({
    credentials: true, origin: true
}));

server.use('/api/', userRouter);
server.use('/api/', categoryRouter);
module.exports = server;