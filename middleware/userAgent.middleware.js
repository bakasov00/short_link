module.exports = (req, res, next) => {
  req.session = {
    browser: req.useragent.browser,
    os: req.useragent.os,
    platform: req.useragent.platform,
  }
  next()
}
