import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, canRemove = false }) => {
  const [visible, setVisible] = useState(false)
  const detailsStyle = { display: visible ? '' : 'none' }

  return (
    <article className="blog">
      <div>
        <span>{blog.title} {blog.author}</span>
        <button type="button" onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div className="blog-details" style={detailsStyle}>
        <div>{blog.url}</div>
        <div>
          <span>likes {blog.likes}</span>
          <button type="button" onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>{blog.user?.name || blog.user?.username || ''}</div>
        {canRemove && (
          <button type="button" onClick={() => handleRemove(blog)}>remove</button>
        )}
      </div>
    </article>
  )
}

export default Blog
