'use strict'

module.exports = ({ mongoose }) => {
  const OrganizerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true, index: true },
    role: { type: String, required: true }
  })

  return mongoose.model('Organizer', OrganizerSchema)
}
