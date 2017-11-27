'use strict'

const Controller = require('egg').Controller

class ManagerController extends Controller {
  async getEventManagers (ctx) {
    ctx.body = await ctx.service.Manager.find({
      event: ctx.params.event
    })
  }

  async createEventManager (ctx) {
    const event = await ctx.service.Event.find({title: ctx.params.event})
    const user = await ctx.service.User.find({username: ctx.params.user})
    ctx.body = await ctx.service.Manager.create({
      event: event.id,
      user: user.id,
      role: ctx.request.body.role
    })
  }

  async udpateEventManager (ctx) {
    // TODO: verify user
    const orgnaizer = await ctx.service.Manager.find({
      event: ctx.params.event,
      user: ctx.params.user
    })
    ctx.body = await ctx.service.Manager.update(orgnaizer.id, ctx.request.body)
  }

  async removeRegister (ctx) {
    const orgnaizer = await ctx.service.Manager.find({
      event: ctx.params.event,
      user: ctx.params.user
    })
    ctx.body = await ctx.service.Manager.destroy(orgnaizer.id)
  }
}

module.exports = ManagerController
