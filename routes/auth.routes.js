const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const { Router } = require('express')
const User = require('../model/User')
const authMiddleware = require('../middleware/auth.middleware')
const dotenv = require('dotenv')
dotenv.config()

const router = Router()

router.post(
  '/signup',
  [
    check('email', 'Не коректные eamil').isEmail(),
    check('password', 'Пароль меньше 6 символов').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Не корректные данные' })
      }

      const { email, password } = req.body

      const isUsed = await User.findOne({ email })
      if (isUsed) {
        return res.status(400).json({ message: 'Такой пользователь уже есть' })
      }

      const hashPassword = await bcrypt.hash(password, 12)
      const user = await new User({ email, password: hashPassword })
      await user.save()

      res.status(201).json({ message: 'Пользователь создан' })
    } catch (err) {
      res.status(500).json({ message: 'Что-то пошло не так', err: err.message })
      console.log(err.message)
    }
  },
)

router.post(
  '/signin',
  [
    check('email', 'Не коректные eamil').isEmail(),
    check('password', 'Пароль меньше 6 символов').isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array, message: 'Не корректные данные' })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден	' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Не верный пароль' })
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
      res.status(200).json({ token, user: { email: user.email } })
    } catch (err) {
      res.status(500).json({ message: 'Что-то пошло не так', err: err.message })
    }
  },
)

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const token = jwt.sign({ userId: req.user.userId }, process.env.JWT_SECRET, {
      expiresIn: '5h',
    })
    const user = await User.findById(req.user.userId)
    res.status(200).json({ token, user: { email: user.email } })
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так', err: err.message })
  }
})

module.exports = router
