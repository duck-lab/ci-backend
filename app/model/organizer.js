'use strict'

module.exports = ({ mongoose }) => {
  const OrganizerSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    logo: { type: String },
    contact: { type: String },
    email: { type: String },
    address: { type: String },
    site: { type: String }
  })

  return mongoose.model('Organizer', OrganizerSchema)
}
