const { Router } = require('express')
const { Link, LinkNoAuth } = require('../model/Link')
const shortId = require('shortid')
const authMiddleware = require('../middleware/auth.middleware')
const userAgentMiddleware = require('../middleware/userAgent.middleware')
const dotenv = require('dotenv')
var geoip = require('geoip-lite')

dotenv.config()

const router = Router()

router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { from } = req.body
    const baseUrl = process.env.BASE_URL
    const code = shortId.generate()
    // const geo = geoip.lookup(req.ip)
    // console.log(req.ip)
    const existing = await Link.findOne({ from })

    if (existing) {
      return res.status(400).json({ message: 'Такой link уже есть!!!' })
    }
    // const lang = req.headers['accept-language'][1]
    const to = baseUrl + 't/' + code
    const link = await Link.create({
      code,
      to,
      from,
      owner: req.user.userId,
    })
    res.status(201).json(link)
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так', err: err.message })
  }
})
//! ------------
router.post('/noauth/generate', async (req, res) => {
  try {
    const { from } = req.body
    const baseUrl = process.env.BASE_URL
    const code = shortId.generate()

    const to = baseUrl + 't/' + code
    const link = await LinkNoAuth.create({
      code,
      to,
      from,
    })

    // const { to, from, code } = link
    res.status(201).json({ to, from })
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так', err: err.message })
  }
})
//! ------------
router.get('/', authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId })
    res.json(links)
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так', err: err.message })
  }
})

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так', err: err.message })
  }
})

router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    await Link.deleteOne({ _id: req.params.id })
    res.json({ message: 'Ссылка удалена' })
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так', err: err.message })
  }
})
module.exports = router
