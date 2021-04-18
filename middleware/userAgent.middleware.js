module.exports = (req, res, next) => {
  // const lang = req.headers['accept-language'][1]
  req.session = {
    browser: req.useragent.browser,
    os: req.useragent.os,
    platform: req.useragent.platform,
  }
  next()
}
