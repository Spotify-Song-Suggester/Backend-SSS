const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../helpers/auth/auth-middleware');
const authRouter = require('../helpers/auth/auth-router');
const songRouter = require('../helpers/DS-songs/songs');
const songsRouter2 = require('../helpers/songs/songs-router');
const server = express();

function logger(req, res, next) {
	console.log(`${req.method} to ${req.originalUrl} at ${new Date()}`);
	next();
}

server.use(logger);

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/songs', authenticate, songsRouter2);

// server.get('/', (req, res) => {
// 	res.send('SHE WORKS!');
// });

server.get('/', (req, res) => {
	res.status(200).json({ api: 'SHE WORKS!', dbenv: process.env.DB_ENV });
});

module.exports = server;
