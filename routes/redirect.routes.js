const { Router } = require('express')
const Link = require('../model/Link')

const router = Router()

router.get('/:code', async (req, res) => {
  try {
    const { code } = req.params

    const link = await Link.findOne({ code })
    if (link) {
      link.clicks++
      await link.save()
      return res.redirect(link.from)
    }

    res.status(404).json({ message: 'Ссылка не найдена' })
  } catch (err) {
    res.status(500).json({ message: 'Что-то пошло не так', err: err.message })
  }
})

module.exports = router
