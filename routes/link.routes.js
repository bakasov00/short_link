const { Router } = require('express')
const { Link, LinkNoAuth } = require('../model/Link')
const Browser = require('../model/Browser')
const Platform = require('../model/Platform')
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
    const existing = await Link.findOne({ from, owner: req.user.userId })

    if (existing) {
      return res.status(400).json({ message: 'Такой link уже есть!!!' })
    }
    const to = baseUrl + '/t/' + code
    const link = await Link.create({
      code,
      to,
      from,
      owner: req.user.userId,
    })
    link.browser = link._id
    await link.save()

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

    const to = baseUrl + '/t/' + code + '/?n=true'
    const link = await LinkNoAuth.create({
      code,
      to,
      from,
    })

    res.status(201).json({ to, from })
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так', err: err.message })
  }
})
//! ------------
router.get('/', authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId })
    res.status(200).json(links)
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так', err: err.message })
  }
})

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)

    const browser = await Platform.find({ ownerLink: link._id })
    const platform = await Browser.find({ ownerLink: link._id })

    res.status(200).json({ link, browser, platform })
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так', err: err.message })
  }
})

router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    await link.remove()
    // await Link.deleteOne({ _id: req.params.id })
    res.json({ message: 'Ссылка удалена' })
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так', err: err.message })
  }
})
module.exports = router
