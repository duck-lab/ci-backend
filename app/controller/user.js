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

    ctx.body = await ctx.service.user.create(info)
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
