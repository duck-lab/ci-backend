'use strict'

module.exports = app => {
  class Model {
    constructor (ctx) {
      this.ctx = ctx
    }

    async getClient (clientId, clientSecret) {
      return {
        clientId: 'test',
        grants: ['password']
      }
      // TODO: add client registration
      // this.ctx.service.accessClient.get('client')
      // if (clientId !== client.clientId || clientSecret !== client.clientSecret) {
      //   return client
      // }
    }
    async getUser (username, password) {
      const user = await this.ctx.service.user.verifyUser(username, password)

      if (!user) {
        return null
      }

      return {userId: user.id}
    }
    async saveToken (token, client, user) {
      const accessToken = await this.ctx.service.accessToken.create(Object.assign({}, token, {user}, {client}))
      return accessToken
    }

    async getAccessToken (bearerToken) {
      const token = await this.ctx.service.accessToken.findByToken(bearerToken)
      const user = await this.ctx.service.user.findById(token.user.userId)
      this.ctx.user = user
      return token
    }

    // TODO: add revoke method in lib
    async revokeToken (token) {
      const result = await this.ctx.services.accessToken.destroyByToken(token)
      if (result.ok === 1) return { status: 'ok' }
      return { status: 'failed' }
    }
    // async getAuthorizationCode(authorizationCode) {}
    // async saveAuthorizationCode(code, client, user) {}
    // async revokeAuthorizationCode(code) {}
  }

  return Model
}
