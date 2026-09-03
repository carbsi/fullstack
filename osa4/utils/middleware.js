const jwt = require('jsonwebtoken')
const config = require('./config')
const logger = require('./logger')
const User = require('../models/user')
// tässä token erotetaan omaan middlewareen
const requestLogger = (request, _response, next) => {
  logger.info(request.method, request.path)
  next()
}

const tokenExtractor = (request, _response, next) => {
  const authorization = request.get('authorization')

  // oma huomio: bearer-etuliite poistetaan ennen tokenin tarkistamista
  request.token = authorization?.toLowerCase().startsWith('bearer ')
    ? authorization.substring(7)
    : null

  next()
}

const userExtractor = async (request, response, next) => {
  try {
    if (!request.token || !config.SECRET) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const decodedToken = jwt.verify(request.token, config.SECRET)
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(401).json({ error: 'token user no longer exists' })
    }

    request.user = user
    next()
  } catch (error) {
    next(error)
  }
}

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  if (error.name === 'MongoServerError' && error.code === 11000) {
    return response.status(400).json({ error: 'username must be unique' })
  }

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
}
