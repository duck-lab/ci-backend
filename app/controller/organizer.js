'use strict'

const Controller = require('egg').Controller

class OrganizerController extends Controller {
  async getAllOrganizer (ctx) {
    ctx.body = await ctx.service.Organizer.find(ctx.query)
  }

  async createOrganizer (ctx) {
    await ctx.service.Organizer.create(ctx.request.body)
  }

  async getOrganize (ctx) {
    ctx.body = await ctx.service.Organizer.find({name: ctx.params.org})
  }

  async updateOrganizer (ctx) {
    const orgnaizer = ctx.service.Organizer.find({name: ctx.params.org})
    ctx.body = await ctx.service.User.update(orgnaizer.id, ctx.request.body)
  }
}

module.exports = OrganizerController
