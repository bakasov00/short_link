const { Router } = require('express')
const { Link } = require('../model/Link')
const userAgentMiddleware = require('../middleware/userAgent.middleware')

const router = Router()

router.get('/:code', userAgentMiddleware, async (req, res) => {
  try {
    const { code } = req.params
    const link = await Link.findOne({ code })
    if (link) {
      link.clicks++
      link.browser = req.session.browser
      link.os = req.session.os
      link.platform = req.session.platform
      await link.save()
      return res.redirect(link.from)
    }

    res.status(404).json({ message: 'Ссылка не найдена' })
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так', err: err.message })
  }
})

module.exports = router
