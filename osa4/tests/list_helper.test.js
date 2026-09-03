const { describe, test } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://example.com/dijkstra-1',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'https://example.com/dijkstra-2',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'https://example.com/martin-1',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'https://example.com/martin-2',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'https://example.com/martin-3',
    likes: 2,
  },
]

test('dummy returns one', () => {
  assert.strictEqual(listHelper.dummy([]), 1)
})

describe('total likes', () => {
  test('of an empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('of one blog equals its likes', () => {
    assert.strictEqual(listHelper.totalLikes([blogs[0]]), 7)
  })

  test('of a larger list is calculated correctly', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 36)
  })
})

describe('favorite blog', () => {
  test('is null for an empty list', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })

  test('has the most likes', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[2])
  })
})

test('author with the most blogs is returned', () => {
  assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
    author: 'Robert C. Martin',
    blogs: 3,
  })
})

test('author with the most likes is returned', () => {
  assert.deepStrictEqual(listHelper.mostLikes(blogs), {
    author: 'Edsger W. Dijkstra',
    likes: 17,
  })
})
