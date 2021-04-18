const { Router } = require('express')
const { Link } = require('../model/Link')
const Browser = require('../model/Browser')
const Platform = require('../model/Platform')
const userAgentMiddleware = require('../middleware/userAgent.middleware')

const router = Router()

router.get('/:code', userAgentMiddleware, async (req, res) => {
  try {
    const { code } = req.params
    const link = await Link.findOne({ code })

    if (link) {
      link.clicks++
      const browser = await Browser.findOne({ name: req.session.browser, ownerLink: link._id })
      if (!!browser) {
        browser.Click++
        await browser.save()
      } else {
        await Browser.create({ name: req.session.browser, Click: 1, ownerLink: link._id })
      }

      const platform = await Platform.findOne({ name: req.session.platform, ownerLink: link._id })
      if (!!platform) {
        platform.Click++
        await platform.save()
      } else {
        await Platform.create({ name: req.session.platform, Click: 1, ownerLink: link._id })
      }

      await link.save()
      return res.redirect(link.from)
    }

    res.status(404).json({ message: 'Ссылка не найдена' })
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так', err: err.message })
  }
})

module.exports = router
