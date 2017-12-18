'use strict'

const Controller = require('egg').Controller

class ManagementController extends Controller {
  async getEventManagements (ctx) {
    ctx.body = await ctx.service.management.findByFilter({
      event: ctx.params.event
    })
  }

  async createEventManagement (ctx) {
    const event = await ctx.service.event.findByFilter({title: ctx.params.event})
    const user = await ctx.service.user.findByFilter({username: ctx.params.user})
    ctx.body = await ctx.service.management.create({
      event: event.id,
      user: user.id,
      role: ctx.request.body.role
    })
  }

  async udpateEventManagement (ctx) {
    // TODO: verify user
    const orgnaizer = await ctx.service.management.findByFilter({
      event: ctx.params.event,
      user: ctx.params.user
    })
    ctx.body = await ctx.service.management.updateById(orgnaizer.id, ctx.request.body)
  }

  async removeEventManagement (ctx) {
    const orgnaizer = await ctx.service.management.findByFilter({
      event: ctx.params.event,
      user: ctx.params.user
    })
    ctx.body = await ctx.service.management.destroyByFilter({_id: orgnaizer.id})
  }

  async createOrgManagement (ctx) {
    // TODO
  }

  async udpateOrgManagement (ctx) {
    // TODO
  }

  async removeOrgManagement (ctx) {
    // TODO
  }
}

module.exports = ManagementController
