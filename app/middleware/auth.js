'use strict'

module.exports = () => {
  return async function (ctx, next) {
    let { authorization: accessToken } = ctx.headers

    if (!accessToken) ctx.throw(401, 'Authentication Required!')

    accessToken = accessToken.replace('Bearer ', '')

    if (!accessToken) throw new Error('Rquired authed user access only!')

    const token = await ctx.service.accessToken.findByToken(accessToken)

    if (!token || token.accessTokenExpiresAt < new Date()) throw new Error('Invalid AccessToken')

    ctx.user = token.user
    ctx.info = token.info

    await next()
  }
}
