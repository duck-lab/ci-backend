'use strict'

const timestamps = require('mongoose-timestamp')

module.exports = ({ mongoose }) => {
  const AccessTokenSchema = new mongoose.Schema({
    accessToken: { type: String, required: true },
    accessTokenExpiresAt: { type: Date, required: true },
    refreshToken: { type: String, required: true },
    refreshTokenExpiresAt: { type: Date, required: true },
    scope: { type: Object },
    client: { type: Object, required: true },
    user: { type: Object, required: true }
  })

  AccessTokenSchema.plugin(timestamps)

  return mongoose.model('AccessToken', AccessTokenSchema)
}
