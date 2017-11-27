'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async getAllUsers (ctx) {
    ctx.body = await ctx.service.User.find(ctx.query)
  }

  async createUser (ctx) {
    await ctx.service.User.create(ctx.request.body)
  }

  async getAuthUser (ctx) {
    const uid = null // TODO: get auth user id
    ctx.body = await ctx.service.User.findById(uid)
  }

  async updateAuthUser (ctx) {
    const uid = null // TODO: get auth user id
    ctx.body = await ctx.service.User.update(uid, ctx.request.body)
  }

  async getByUsername (ctx) {
    ctx.body = await ctx.service.User.find({username: ctx.params.nick_name})
  }
}

module.exports = UserController
