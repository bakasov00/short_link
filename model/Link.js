const { Schema, model, Types } = require('mongoose')

const linkOwner = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  browser: { type: String, default: 'None' },
  os: { type: String, default: 'None' },
  platform: { type: String, default: 'None' },
  lang: { type: String, default: 'None' },
  owner: { type: Types.ObjectId, ref: 'User' },
})

const linkNoAuth = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
})

module.exports = {
  Link: model('Link', linkOwner),
  LinkNoAuth: model('LinkNoAuth', linkNoAuth),
}
