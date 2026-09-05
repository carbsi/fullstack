const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

// kaikki blogit, jokaiseen liitetty tekijan kayttajanimi ja nimi
blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})
// uuden blogin luonti vaatii kirjautuneen kayttajan (userExtractor)
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  // blogi lisataan myos kayttajan omaan listaan
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
  response.status(201).json(populatedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  if (!blog.user || blog.user.toString() !== request.user.id.toString()) {
    return response.status(403).json({ error: 'only the creator can delete a blog' })
  }

  await Blog.findByIdAndDelete(blog.id)
  request.user.blogs = request.user.blogs.filter(id => id.toString() !== blog.id)
  await request.user.save()

  response.status(204).end()
})
// paivitetaan vain sallitut kentat, esim. tykkaysten lisays
blogsRouter.put('/:id', async (request, response) => {
  const allowedFields = ['title', 'author', 'url', 'likes']
  const updates = Object.fromEntries(
    allowedFields
      .filter(field => request.body[field] !== undefined)
      .map(field => [field, request.body[field]]),
  )

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    updates,
    { new: true, runValidators: true },
  )

  if (!updatedBlog) {
    return response.status(404).end()
  }

  response.json(updatedBlog)
})

module.exports = blogsRouter
