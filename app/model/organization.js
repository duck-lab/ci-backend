'use strict'

const timestamps = require('mongoose-timestamp')

module.exports = ({ mongoose }) => {
  const OrganizationSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    logo: { type: String },
    contact: { type: String },
    email: { type: String },
    address: { type: String },
    site: { type: String },
    __v: { type: Number, select: false }
  })

  OrganizationSchema.plugin(timestamps)

  return mongoose.model('Organization', OrganizationSchema)
}
