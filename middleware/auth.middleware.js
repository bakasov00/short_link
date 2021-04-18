const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../model/User')
dotenv.config()

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({ message: 'Нет пользователя в базе данных' })
    }
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ message: 'Нет авторизации', err: err.message })
  }
}
