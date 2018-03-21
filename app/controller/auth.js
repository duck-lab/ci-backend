'use strict'

const crypto = require('crypto')
const Controller = require('egg').Controller
const { DateTime } = require('luxon')

const generateToke = (data, secret) => {
  if (typeof data !== 'string') {
    data = JSON.stringify(data)
  }

  const now = (new Date().getTime())
  const epoch = Math.floor(now / 1000)
  return crypto.createHmac('sha256', secret).update(data + epoch).digest('base64')
}

class AuthController extends Controller {
  async basicLogin (ctx) {
    const { username, password } = ctx.request.body

    if (!username || !password) {
      this.ctx.throw(400, 'Missing username or password!')
    }

    const user = await ctx.service.user.verifyUser(username, password)
    // TODO: Fetch info

    if (!user) {
      this.ctx.throw(400, 'Incorrect username or password')
    }

    const token = await ctx.service.accessToken.create({
      accessToken: generateToke(`ACCESS_${user.username}`, ctx.app.config.accessToken.secret),
      accessTokenExpiresAt: DateTime.local().plus({day: ctx.app.config.accessToken.expiredForAccessDays}),
      refreshToken: generateToke(`REFRESH_${user.username}`, ctx.app.config.accessToken.secret),
      refreshTokenExpiresAt: DateTime.local().plus({day: ctx.app.config.accessToken.expiredForRefreshDays}),
      user: user
    })

    this.ctx.body = {
      // TODO: *** fix with the correct role ***
      currentAuthority: 'admin',
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt
    }
  }

  async customLogin (ctx) {
    const { openId } = ctx.params

    if (!openId) {
      this.ctx.throw(400, 'Missing openId')
    }

    const user = await ctx.service.user.findByOpenId(openId)

    if (!user) {
      this.ctx.throw(400, 'Failed to find user with OPENID')
    }

    const token = await ctx.service.accessToken.create({
      accessToken: generateToke(`ACCESS_${user.username}`, ctx.app.config.accessToken.secret),
      accessTokenExpiresAt: DateTime.local().plus({day: ctx.app.config.accessToken.expiredForAccessDays}),
      refreshToken: generateToke(`REFRESH_${user.username}`, ctx.app.config.accessToken.secret),
      refreshTokenExpiresAt: DateTime.local().plus({day: ctx.app.config.accessToken.expiredForRefreshDays}),
      user: user
    })

    this.ctx.body = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt
    }
  }

  async refreshToken (ctx) {
    const { refreshToken } = ctx.params

    if (!refreshToken) {
      this.ctx.throw(400, 'Missing refershToken')
    }

    const accessToken = await ctx.service.accesstoken.findByRefreshToken(refreshToken)

    if (!accessToken || Date(accessToken.refreshTokenExpiresAt) < new Date()) {
      this.ctx.throw(400, 'Invalid refreshToken')
    }

    const token = await ctx.service.accessToken.create({
      accessToken: generateToke(`ACCESS_${accessToken.user.username}`, ctx.app.config.accessToken.secret),
      accessTokenExpiresAt: DateTime.local().plus({day: ctx.app.config.accessToken.expiredForAccessDays}),
      refreshToken: generateToke(`REFRESH_${accessToken.user.username}`, ctx.app.config.accessToken.secret),
      refreshTokenExpiresAt: DateTime.local().plus({day: ctx.app.config.accessToken.expiredForRefreshDays}),
      user: accessToken.user
    })

    this.ctx.body = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt
    }
  }

  async revokeToken (ctx) {
    const { authorization: accessToken } = ctx.headers

    await this.ctx.service.accesstoken.destroyByToken(accessToken)

    ctx.redirect('/')
  }
}

module.exports = AuthController
