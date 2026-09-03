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

let token
let user

before(async () => {
  await mongoose.connection.asPromise()
  await User.init()
})

beforeEach(async () => {
  // oma huomio: jokainen testi alkaa samasta tunnetusta tietokannan tilasta
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret123', 10)
  user = await new User({
    username: 'testuser',
    name: 'test user',
    passwordHash,
  }).save()

  const blogObjects = helper.initialBlogs.map(blog => new Blog({
    ...blog,
    user: user._id,
  }))
  const savedBlogs = await Promise.all(blogObjects.map(blog => blog.save()))
  user.blogs = savedBlogs.map(blog => blog._id)
  await user.save()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'testuser', password: 'secret123' })
    .expect(200)

  token = loginResponse.body.token
})

describe('when blogs exist', () => {
  test('they are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('their identifier is named id', async () => {
    const response = await api.get('/api/blogs')

    assert(response.body.every(blog => blog.id))
    assert(response.body.every(blog => blog._id === undefined))
  })

  test('user details are populated', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body[0].user.username, 'testuser')
  })
})

describe('adding a blog', () => {
  test('succeeds with a valid token', async () => {
    const newBlog = {
      title: 'async and await make tests readable',
      author: 'test user',
      url: 'https://example.com/async-await',
      likes: 4,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    assert(blogsAtEnd.some(blog => blog.title === newBlog.title))
  })

  test('defaults likes to zero', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'a blog without likes',
        author: 'test user',
        url: 'https://example.com/no-likes',
      })
      .expect(201)

    assert.strictEqual(response.body.likes, 0)
  })

  test('fails when title is missing', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ author: 'test user', url: 'https://example.com/no-title' })
      .expect(400)

    assert.strictEqual((await helper.blogsInDb()).length, helper.initialBlogs.length)
  })

  test('fails when url is missing', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'a blog without url', author: 'test user' })
      .expect(400)

    assert.strictEqual((await helper.blogsInDb()).length, helper.initialBlogs.length)
  })

  test('fails with status 401 when token is missing', async () => {
    await api
      .post('/api/blogs')
      .send({
        title: 'unauthorized blog',
        author: 'test user',
        url: 'https://example.com/unauthorized',
      })
      .expect(401)

    assert.strictEqual((await helper.blogsInDb()).length, helper.initialBlogs.length)
  })
})

describe('deleting a blog', () => {
  test('succeeds for its creator', async () => {
    const blogToDelete = (await helper.blogsInDb())[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    assert(!blogsAtEnd.some(blog => blog.id === blogToDelete.id))
  })

  test('fails for a different user', async () => {
    const passwordHash = await bcrypt.hash('other123', 10)
    await new User({
      username: 'otheruser',
      name: 'other user',
      passwordHash,
    }).save()
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'otheruser', password: 'other123' })
    const blogToDelete = (await helper.blogsInDb())[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`)
      .expect(403)

    assert.strictEqual((await helper.blogsInDb()).length, helper.initialBlogs.length)
  })
})

test('a blog can be updated', async () => {
  const blogToUpdate = (await helper.blogsInDb())[0]

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: 20 })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 20)
  assert.strictEqual(response.body.title, blogToUpdate.title)
})

after(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await mongoose.connection.close()
})
