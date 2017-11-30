'use strict'

const Controller = require('egg').Controller

class ManagerController extends Controller {
  async getEventManagers (ctx) {
    ctx.body = await ctx.service.manager.find({
      event: ctx.params.event
    })
  }

  async createEventManager (ctx) {
    const event = await ctx.service.event.find({title: ctx.params.event})
    const user = await ctx.service.user.find({username: ctx.params.user})
    ctx.body = await ctx.service.manager.create({
      event: event.id,
      user: user.id,
      role: ctx.request.body.role
    })
  }

  async udpateEventManager (ctx) {
    // TODO: verify user
    const orgnaizer = await ctx.service.manager.find({
      event: ctx.params.event,
      user: ctx.params.user
    })
    ctx.body = await ctx.service.manager.update(orgnaizer.id, ctx.request.body)
  }

  async removeRegister (ctx) {
    const orgnaizer = await ctx.service.manager.find({
      event: ctx.params.event,
      user: ctx.params.user
    })
    ctx.body = await ctx.service.manager.destroy(orgnaizer.id)
  }
}

module.exports = ManagerController
