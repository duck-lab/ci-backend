'use strict'

module.exports = ({ mongoose }) => {
  const ManagerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
    role: { type: String, required: true },
    __v: { type: Number, select: false }
  })

  ManagerSchema.index({user: 1, event: 1}, { unique: true }) // build multi key index.

  return mongoose.model('Manager', ManagerSchema)
}
