'use strict'

module.exports = app => {
  class AccessTokenService extends app.Service {
    async create (info) {
      if (!info) { return }
      let data = await this.ctx.model.AccessToken.create(info)
      return data
    }

    async findByToken (bearerToken) {
      let data = await this.ctx.model.AccessToken.findOne({ accessToken: bearerToken })
      return data
    }

    async destroyByToken (token) {
      let data = await this.ctx.model.AccessToken.deleteOne({ accessToken: token })
      return data.result
    }
  }

  return AccessTokenService
}
