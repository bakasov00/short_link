const { Schema, model, Types } = require('mongoose')

const user = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  links: [{ type: Types.ObjectId, ref: 'Link' }],
})

user.pre('remove', function (next) {
  Link.deleteMany({ owner: this._id }).exec()
  next()
})

module.exports = model('User', user)
