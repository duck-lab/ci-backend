'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async getAllUsers (ctx) {
    ctx.body = await ctx.service.user.findByFilter(ctx.query)
  }

  async createUser (ctx) {
    let info = ctx.request.body

    delete info.confirm
    // TODO: Add mobile code verify
    // TODO: Send verify email
    delete info.captcha

    const userInfo = await ctx.service.user.create(info)

    delete userInfo.hashedPassword

    // TODO: consider status value
    ctx.body = Object.assign({}, {
      status: 'ok'
    }, userInfo)
  }

  async getAuthUser (ctx) {
    const { user: currentUser } = ctx
    ctx.body = await ctx.service.user.findById(currentUser.id)
  }

  async updateAuthUser (ctx) {
    const { user: currentUser } = ctx
    ctx.body = await ctx.service.user.updateById(currentUser.id, ctx.request.body)
  }

  async getUserByUsername (ctx) {
    ctx.body = await ctx.service.user.findByName(ctx.params.username)
  }
}

module.exports = UserController
