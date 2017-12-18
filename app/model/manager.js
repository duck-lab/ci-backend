'use strict'

const timestamps = require('mongoose-timestamp')

module.exports = ({ mongoose }) => {
  const ManagerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', index: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', index: true },
    role: { type: String, required: true },
    __v: { type: Number, select: false }
  })

  ManagerSchema.plugin(timestamps)

  ManagerSchema.index({user: 1, event: 1, organizer: 1}, { unique: true }) // build multi key index.

  return mongoose.model('Manager', ManagerSchema)
}
