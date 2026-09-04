import { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()
  const notificationTimer = useRef()

  const showNotification = (message, type = 'success') => {
    window.clearTimeout(notificationTimer.current)
    setNotification({ message, type })
    notificationTimer.current = window.setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll()
      .then(setBlogs)
      .catch(() => showNotification('could not load blogs', 'error'))
  }, [])

  useEffect(() => {
    // local storage pitää kirjautumisen tallessa sivun lataamisen jälkeen
    const savedUser = window.localStorage.getItem('loggedBlogappUser')

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const handleLogin = async credentials => {
    try {
      const loggedUser = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser),
      )
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      showNotification(`welcome ${loggedUser.name}`)
    } catch {
      showNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const createBlog = async blog => {
    try {
      const savedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(savedBlog))
      blogFormRef.current.toggleVisibility()
      showNotification(`a new blog ${savedBlog.title} by ${savedBlog.author} added`)
    } catch (error) {
      showNotification(error.response?.data?.error || 'could not create blog', 'error')
    }
  }

  const likeBlog = async blog => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
      })
      const blogWithUser = { ...updatedBlog, user: blog.user }
      setBlogs(blogs.map(item => item.id === blog.id ? blogWithUser : item))
    } catch {
      showNotification('could not like blog', 'error')
    }
  }

  const removeBlog = async blog => {
    if (!window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      return
    }

    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(item => item.id !== blog.id))
      showNotification(`removed ${blog.title}`)
    } catch {
      showNotification('could not remove blog', 'error')
    }
  }

  if (!user) {
    return (
      <main>
        <h1>log in to application</h1>
        <Notification notification={notification} />
        <LoginForm handleLogin={handleLogin} />
      </main>
    )
  }

  const sortedBlogs = [...blogs].sort((first, second) => second.likes - first.likes)

  return (
    <main>
      <h1>blogs</h1>
      <Notification notification={notification} />
      <p>
        {user.name} logged in{' '}
        <button type="button" onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      <section aria-label="blog list">
        {sortedBlogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={likeBlog}
            handleRemove={removeBlog}
            canRemove={blog.user?.username === user.username}
          />
        ))}
      </section>
    </main>
  )
}

export default App
