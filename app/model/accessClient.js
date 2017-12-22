'use strict'

const timestamps = require('mongoose-timestamp')

module.exports = ({ mongoose }) => {
  const AccessClientSchema = new mongoose.Schema({
    clientId: { type: String, required: true },
    clientSecret: { type: String, required: true },
    redirectUris: [String],
    accessTokenLifeTime: { type: Number, default: 0 },
    refrestTokenLiftTime: { type: Number, default: 0 },
    grantTypes: [String]
  })

  AccessClientSchema.plugin(timestamps)

  return mongoose.model('AccessClient', AccessClientSchema)
}
