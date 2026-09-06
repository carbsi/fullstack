const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')



// tyhjentaa tietokannan testien valissa, kaytossa vain NODE_ENV=test
testingRouter.post('/reset', async (_request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter
