'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async getAllUsers (ctx) {
    ctx.body = await ctx.service.user.find(ctx.query)
  }

  async createUser (ctx) {
    await ctx.service.user.create(ctx.request.body)
  }

  async getAuthUser (ctx) {
    const uid = null // TODO: get auth user id
    ctx.body = await ctx.service.user.findById(uid)
  }

  async updateAuthUser (ctx) {
    const uid = null // TODO: get auth user id
    ctx.body = await ctx.service.user.update(uid, ctx.request.body)
  }

  async getByUsername (ctx) {
    ctx.body = await ctx.service.user.find({username: ctx.params.nick_name})
  }
}

module.exports = UserController
