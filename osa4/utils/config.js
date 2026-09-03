require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET
const DB_NAME = process.env.NODE_ENV === 'test'
  ? 'bloglist_test'
  : 'bloglist'

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET,
  DB_NAME,
}
