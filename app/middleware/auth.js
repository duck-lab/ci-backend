'use strict'

module.exports = () => {
  return async function (ctx, next) {
    const { authorization: accessToken } = ctx.headers

    if (!accessToken) throw new Error('Rquired authed user access only!')

    // const token = await ctx.service.accessToken.findByToken(accessToken)

    // if (!token) throw new Error('Invalid AccessToken')

    ctx.user = { user: 'asdf' } //accessToken.user
    ctx.role = { role: 'role' } //accessToken.role

    await next()
  }
}
