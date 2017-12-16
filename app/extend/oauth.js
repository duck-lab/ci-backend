'use strict'

const bcrypt = require('bcrypt')

module.exports = app => {
  class Model {
    constructor (ctx) {
      this.ctx = ctx // TODO: Can't get ctx, to fix in the egg-oauth2 module.
    }

    async getClient (clientId, clientSecret) {
      return {
        clientId: 'test',
        grants: ['password']
      }
      // TODO: add client register
      // this.ctx.service.accessClient.get('client')
      // if (clientId !== client.clientId || clientSecret !== client.clientSecret) {
      //   return client
      // }
    }
    async getUser (username, password) {
      // TODO: fix the user id;
      // const user = await this.ctx.service.user.verifyUser(username, password)
      const user = await app.model.User.findOne({ $or: [
        { email: username },
        { username: username }
      ]})
      if (!user) {
        return null
      }

      const result = await bcrypt.compare(password, user.hashedPassword)
      if (!result) {
        console.log('>>> auth failed')
        return null
      } else {
        return {userId: user.id}
      }
    }
    async saveToken (token, client, user) {
      const finaltoken = Object.assign({}, token, {user}, {client})
      // TODO: fix the service in this
      // const accessToken = await this.ctx.service.accessToken.create(Object.assign({}, token, {user: user.id}, {client}))
      // console.log('>>> access token', accessToken)
      return finaltoken
    }

    async getAccessToken (bearerToken) {
      // TODO: fix fetch token from the service
      // const token = await this.ctx.service.AccessToken.findOne({ accessToken: bearerToken });
      // return token
      return {
        'accessToken': '36f773f1c9322a61f30e6dee0c8a0fed6b1a1123',
        'accessTokenExpiresAt': new Date('2017-09-21T13:23:31.881Z'),
        'refreshToken': '95ab4c0d44147a63e1acf0eb20e5491ec09c4480',
        'refreshTokenExpiresAt': new Date('2017-10-05T12:23:31.881Z'),
        'user': {
          'userId': 1
        },
        'client': {
          'id': 1,
          'clientId': 'my_app',
          'clientSecret': 'my_secret',
          'redirectUris': [
            'http://implements.io'
          ],
          'refreshTokenLifetime': 0,
          'accessTokenLifetime': 0,
          'grants': [
            'password'
          ]
        }
      }
    }
    // TODO add other method
    // async revokeToken(token) {}
    // async getAuthorizationCode(authorizationCode) {}
    // async saveAuthorizationCode(code, client, user) {}
    // async revokeAuthorizationCode(code) {}
  }

  return Model
}
