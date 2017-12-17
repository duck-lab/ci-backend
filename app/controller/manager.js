'use strict'

const Controller = require('egg').Controller

class ManagerController extends Controller {
  async getEventManagers (ctx) {
    ctx.body = await ctx.service.manager.findByFilter({
      event: ctx.params.event
    })
  }

  async createEventManager (ctx) {
    const event = await ctx.service.event.findByFilter({title: ctx.params.event})
    const user = await ctx.service.user.findByFilter({username: ctx.params.user})
    ctx.body = await ctx.service.manager.create({
      event: event.id,
      user: user.id,
      role: ctx.request.body.role
    })
  }

  async udpateEventManager (ctx) {
    // TODO: verify user
    const orgnaizer = await ctx.service.manager.findByFilter({
      event: ctx.params.event,
      user: ctx.params.user
    })
    ctx.body = await ctx.service.manager.updateById(orgnaizer.id, ctx.request.body)
  }

  async removeEventManager (ctx) {
    const orgnaizer = await ctx.service.manager.findByFilter({
      event: ctx.params.event,
      user: ctx.params.user
    })
    ctx.body = await ctx.service.manager.destroyByFilter({_id: orgnaizer.id})
  }

  async createOrgManager (ctx) {
    // TODO
  }

  async udpateOrgManager (ctx) {
    // TODO
  }

  async removeOrgManager (ctx) {
    // TODO
  }
}

module.exports = ManagerController
