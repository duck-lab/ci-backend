'use strict'

const timestamps = require('mongoose-timestamp')

module.exports = ({ mongoose }) => {
  const ManagementSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', index: true },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', index: true },
    role: { type: String, required: true },
    __v: { type: Number, select: false }
  })

  ManagementSchema.plugin(timestamps)

  ManagementSchema.index({user: 1, event: 1, organization: 1}, { unique: true }) // build multi key index.

  return mongoose.model('Management', ManagementSchema)
}
