'use strict'

module.exports = ({ mongoose }) => {
  const RegisterSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', index: true },
    mobile: { type: String, index: true },
    registCode: { type: String, unique: true, index: true },
    isRegisted: { type: Boolean, default: false },
    __v: { type: Number, select: false }
  })

  RegisterSchema.index({user: 1, event: 1}, { unique: true }) // build multi key index.

  return mongoose.model('Register', RegisterSchema)
}
