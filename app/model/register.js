'use strict'

module.exports = ({ mongoose }) => {
  const RegisterSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', index: true },
    mobile: { type: String, index: true },
    registCode: { type: String, unique: true, index: true },
    isRegisted: { type: Boolean, default: false }
  })

  return mongoose.model('Register', RegisterSchema)
}
