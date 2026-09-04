const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')

const app = express()

mongoose.set('strictQuery', false)

if (!config.MONGODB_URI) {
  throw new Error('mongodb connection string is missing')
}

mongoose.connect(config.MONGODB_URI, {
  dbName: config.DB_NAME,
  family: 4,
})
  .then(() => logger.info(`connected to mongodb database ${config.DB_NAME}`))
  .catch(error => logger.error('error connecting to mongodb:', error.message))

app.use(express.json())
// middlewarejen järjestys määrää reittien käytössä olevat tiedot
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
