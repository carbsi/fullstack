const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })

  // jos kayttajaa ei loydy, verrataan silti johonkin ettei
  // vastausaika paljasta onko kayttajanimi olemassa
  const passwordCorrect = user
    ? await bcrypt.compare(password || '', user.passwordHash)
    : false

  if (!user || !passwordCorrect) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  if (!config.SECRET) {
    return response.status(500).json({ error: 'token secret is not configured' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }
  const token = jwt.sign(userForToken, config.SECRET)

  response.status(200).send({
    token,
    username: user.username,
    name: user.name,
  })
})

module.exports = loginRouter
