const bcrypt = require('bcrypt')
const User = require('../models/user')
const { setToken } = require('../service/auth')

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10) // Hash the password
    await User.create({
      name,
      email,
      password: hashedPassword,
    })
    return res.redirect('/')
  } catch (error) {
    console.error('Signup error:', error)
    return res.status(500).send('Internal Server Error')
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    const isPasswordValid = user
      ? await bcrypt.compare(password, user.password)
      : false

    if (!user || !isPasswordValid) {
      return res.redirect('/login?error=Invalid Username or Password')
    }

    const token = await setToken(user)
    res.cookie('token', token, { httpOnly: true })
    return res.redirect('/')
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).send('Internal Server Error')
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
}
