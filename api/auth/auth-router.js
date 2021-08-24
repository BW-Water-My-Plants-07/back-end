const router = require('express').Router();
const { JWT_SECRET } = require('../secrets');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../users/users-model');
const { checkUsernameExists } = require('../middleware/restricted')

// Register user
router.post('/register', (req, res, next) => {
      const { username, password, phoneNumber } = req.body
        if (!phoneNumber || !phoneNumber.trim()) {
            next({ status: 401, message: 'username and password required' }) 
        } else {
            const hash = bcrypt.hashSync(password, process.env.ROUNDS || 8)
            User.add({ username, password: hash, phoneNumber })
              .then(newUser => {
                res.status(201).json(newUser)
              })
              .catch(next)
        }
});

// Login user
router.post('/login', checkUsernameExists, (req, res, next) => {
  if (bcrypt.compareSync(req.body.password, req.user.password)) {
    const token = buildToken(req.user)
    res.json({
      message: `Welcome back, ${req.user.username}`,
      token
    })
  } else if (
    !req.body.username ||
    !req.body.username.trim() ||
    !req.body.password ||
    !req.body.password.trim() 
    )
  {
   next({ status: 401, message: 'Username and Password required' }) 
  } else {
    next({ status: 401, message: 'Invalid Credentials' })
  }
});

// Token
function buildToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
  }
  const options = {
    expiresIn: '1d'
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

module.exports = router;
