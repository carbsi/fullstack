const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Ada Example',
    url: 'https://example.com/html',
    likes: 2,
  },
  {
    title: 'Browser can execute only JavaScript',
    author: 'Linus Example',
    url: 'https://example.com/javascript',
    likes: 5,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'temporary blog',
    author: 'temporary author',
    url: 'https://example.com/temporary',
  })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  nonExistingId,
}
