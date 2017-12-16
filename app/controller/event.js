'use strict'

const Controller = require('egg').Controller

class EventController extends Controller {
  async getAllEvents (ctx) {
    ctx.body = await ctx.service.event.find(ctx.query)
  }

  async createEvent (ctx) {
    ctx.body = await ctx.service.event.create(ctx.request.body)
  }

  async getAuthUserEvents (ctx) {
    const uid = null // TODO: get auth user info
    ctx.body = await ctx.service.Register.find({
      user: uid
    })
  }

  async getUserEvents (ctx) {
    const result = await ctx.service.user.find({
      username: ctx.params.username
    })
    const user = result.data[0]
    ctx.body = await ctx.service.register.find({
      user: user.id
    })
  }

  async getEvent (ctx) {
    ctx.body = await ctx.service.event.find({title: ctx.params.event})
  }

  async updateAnEvent (ctx) {
    // TODO: check adminiation
    ctx.body = await ctx.service.event.update(ctx.params.event, ctx.request.body)
  }
}

module.exports = EventController
