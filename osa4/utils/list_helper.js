const _ = require('lodash')

const dummy = () => 1


// summataan kaikkien blogien tykkaykset yhteen
const totalLikes = blogs => blogs.reduce(
  (sum, blog) => sum + (blog.likes || 0),
  0,
)


// etsitaan eniten tykatty blogi, tai null jos lista on tyhja
const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((favorite, blog) => (
    (blog.likes || 0) > (favorite.likes || 0) ? blog : favorite
  ))
}


// ketä on kirjoittanut eniten blogeja määrä ei tykkäykset
const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return null
  }

  // countBy laskee kuinka monta blogia kullakin kirjoittajalla on
  const counts = _.countBy(blogs, 'author')
  const author = _.maxBy(Object.keys(counts), name => counts[name])

  return { author, blogs: counts[author] }
}

const mostLikes = blogs => {
  if (blogs.length === 0) {
    return null
  }
  // ryhmitellään kirjoittajan mukaan siten summataan kunkin ryhmän tykkäykset
  const likesByAuthor = _.mapValues(
    _.groupBy(blogs, 'author'),
    authorBlogs => _.sumBy(authorBlogs, blog => blog.likes || 0),
  )
  const author = _.maxBy(Object.keys(likesByAuthor), name => likesByAuthor[name])

  return { author, likes: likesByAuthor[author] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
