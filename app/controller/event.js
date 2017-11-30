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
    ctx.body = await ctx.service.Register.find({
      user: ctx.params.username
    })
  }

  async getEvent (ctx) {
    ctx.body = await ctx.service.event.find({title: ctx.params.event})
  }

  async patchEvent (ctx) {
    await ctx.service.event.update(ctx.params.event, ctx.request.body)
  }
}

module.exports = EventController
