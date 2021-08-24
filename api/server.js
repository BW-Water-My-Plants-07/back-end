const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const {restricted, checkUsernameExists} = require('./middleware/restricted');

const { postRouter, authRouter } = require('./auth/auth-router.js');
const plantsRouter = require('./plants/plants-router');

// const db = require('../data/db-config')

// function getAllUsers() { return db('users') }

// async function insertUser(user) {
//   const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
//   return newUserObject // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
// }

// server.get('/api/users', async (req, res) => {
//   res.json(await getAllUsers())
// })

// server.post('/api/users', async (req, res) => {
//   res.status(201).json(await insertUser(req.body))
// })

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth/register', postRouter); // no middleware
server.use('/api/auth/login', checkUsernameExists, authRouter);
server.use('/api/plants', restricted, plantsRouter);

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
  });
});

module.exports = server
