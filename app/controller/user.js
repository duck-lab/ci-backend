'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async getAllUsers (ctx) {
    ctx.body = await ctx.service.user.findByFilter(ctx.query)
  }

  async createUser (ctx) {
    ctx.body = await ctx.service.user.create(ctx.request.body)
  }

  async getAuthUser (ctx) {
    const { user: currentUser } = ctx
    ctx.body = await ctx.service.user.findById(currentUser.userId)
  }

  async updateAuthUser (ctx) {
    const { user: currentUser } = ctx
    ctx.body = await ctx.service.user.updateById(currentUser.id, ctx.request.body)
  }

  async getByUsername (ctx) {
    ctx.body = await ctx.service.user.findByName(ctx.params.nick_name)
  }
}

module.exports = UserController
