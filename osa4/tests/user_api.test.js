const { before, beforeEach, describe, test, after } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

before(async () => {
  await mongoose.connection.asPromise()
  await User.init()
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret123', 10)
  await new User({
    username: 'rootuser',
    name: 'root user',
    passwordHash,
  }).save()
})

describe('creating a user', () => {
  test('succeeds with fresh credentials', async () => {
    const usersAtStart = await helper.usersInDb()

    const response = await api
      .post('/api/users')
      .send({
        username: 'newuser',
        name: 'new user',
        password: 'newsecret',
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    assert.strictEqual(response.body.passwordHash, undefined)
  })

  test('fails with a duplicate username', async () => {
    const usersAtStart = await helper.usersInDb()

    const response = await api
      .post('/api/users')
      .send({ username: 'rootuser', name: 'duplicate', password: 'secret123' })
      .expect(400)

    assert.match(response.body.error, /unique/)
    assert.strictEqual((await helper.usersInDb()).length, usersAtStart.length)
  })

  test('fails with a short username', async () => {
    const response = await api
      .post('/api/users')
      .send({ username: 'ab', name: 'short name', password: 'secret123' })
      .expect(400)

    assert.match(response.body.error, /shorter than the minimum allowed length/)
  })

  test('fails with a short password', async () => {
    const response = await api
      .post('/api/users')
      .send({ username: 'validuser', name: 'short password', password: 'ab' })
      .expect(400)

    assert.match(response.body.error, /at least 3/)
  })
})

test('a valid user can log in', async () => {
  const response = await api
    .post('/api/login')
    .send({ username: 'rootuser', password: 'secret123' })
    .expect(200)

  assert(response.body.token)
  assert.strictEqual(response.body.username, 'rootuser')
})

test('an incorrect password is rejected', async () => {
  await api
    .post('/api/login')
    .send({ username: 'rootuser', password: 'wrong-password' })
    .expect(401)
})

test('users and blogs contain populated references', async () => {
  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'rootuser', password: 'secret123' })

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${loginResponse.body.token}`)
    .send({
      title: 'references connect documents',
      author: 'root user',
      url: 'https://example.com/references',
    })
    .expect(201)

  const blogsResponse = await api.get('/api/blogs')
  const usersResponse = await api.get('/api/users')

  assert.strictEqual(blogsResponse.body[0].user.username, 'rootuser')
  assert.strictEqual(usersResponse.body[0].blogs[0].title, 'references connect documents')
})

after(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await mongoose.connection.close()
})
