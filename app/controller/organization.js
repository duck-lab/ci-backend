'use strict'

const Controller = require('egg').Controller

class OrganizationController extends Controller {
  async getAllOrganizations (ctx) {
    ctx.body = await ctx.service.organization.findByFilter(ctx.query)
  }

  async createOrganization (ctx) {
    ctx.body = await ctx.service.organization.create(ctx.request.body)
  }

  async getAuthUserOrganizations (ctx) {
    const { user: currentUser } = ctx
    ctx.body = await ctx.service.management.findManagedOrgs(currentUser.id)
  }

  async getUserOrganizations (ctx) {
    const user = await ctx.service.user.findByName(ctx.params.name)
    ctx.body = await ctx.service.registration.findManagedOrgs(user.id)
  }

  async getOrganization (ctx) {
    ctx.body = await ctx.service.organization.findByName(ctx.params.org)
  }

  async updateOrganization (ctx) {
    // const { user: currentUser } = ctx
    const orgnaizer = ctx.service.organization.findByName({name: ctx.params.org})
    // const management = ctx.service.organization.findByfilter({user: currentUser.id, org: orgnaizer.id})
    // check management role
    ctx.body = await ctx.service.User.update(orgnaizer.id, ctx.request.body)
  }
}

module.exports = OrganizationController
