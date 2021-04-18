const { Schema, model, Types } = require('mongoose')

const browser = new Schema({
  name: { type: String },
  Click: { type: Number, default: 0 },
  ownerLink: { type: Types.ObjectId, ref: 'Link' },
})

module.exports = model('Browser', browser)
