'use strict'

const Controller = require('egg').Controller

class OrganizerController extends Controller {
  async getAllOrganizers (ctx) {
    ctx.body = await ctx.service.organizer.findByFilter(ctx.query)
  }

  async createOrganizer (ctx) {
    ctx.body = await ctx.service.organizer.create(ctx.request.body)
  }

  async getAuthUserOrganizers (ctx) {
    const { user: currentUser } = ctx
    ctx.body = await ctx.service.manager.findManagedOrgs(currentUser.id)
  }

  async getUserOrganizers (ctx) {
    const user = await ctx.service.user.findByName(ctx.params.name)
    ctx.body = await ctx.service.register.findManagedOrgs(user.id)
  }

  async getOrganize (ctx) {
    ctx.body = await ctx.service.organizer.findByName(ctx.params.org)
  }

  async updateOrganizer (ctx) {
    // const { user: currentUser } = ctx
    const orgnaizer = ctx.service.organizer.findByName({name: ctx.params.org})
    // const management = ctx.service.organizer.findByfilter({user: currentUser.id, org: orgnaizer.id})
    // check management role
    ctx.body = await ctx.service.User.update(orgnaizer.id, ctx.request.body)
  }
}

module.exports = OrganizerController
