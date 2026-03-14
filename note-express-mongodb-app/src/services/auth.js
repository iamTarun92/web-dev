const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY || '12345!@#$%'

async function setToken(user) {
  const { _id, email } = user
  const token = jwt.sign({ _id, email }, SECRET_KEY)
  return token
}

function getToken(token) {
  if (!token) return null
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (error) {
    return null
  }
}

module.exports = {
  setToken,
  getToken,
}
