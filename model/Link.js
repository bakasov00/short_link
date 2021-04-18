const { Schema, model, Types } = require('mongoose')
const Platform = require('./Platform')
const Browser = require('./Browser')

const linkOwner = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  browser: [{ type: Types.ObjectId, ref: 'Browser' }],
  platform: [{ type: Types.ObjectId, ref: 'Platform' }],

  // lang: { type: String, default: 'None' },
  owner: { type: Types.ObjectId, ref: 'User' },
})

// !=========================
const linkNoAuth = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
})
// !=========================

linkOwner.pre('remove', function (next) {
  Platform.deleteMany({ ownerLink: this._id }).exec()
  Browser.deleteMany({ ownerLink: this._id }).exec()
  next()
})

module.exports = {
  Link: model('Link', linkOwner),
  LinkNoAuth: model('LinkNoAuth', linkNoAuth),
}
