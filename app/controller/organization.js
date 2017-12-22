'use strict'

const Controller = require('egg').Controller
const { MANAGEMENT_ROLE } = require('../public/enum')

const MANAGER_ROLE_KEYS = Object.keys(MANAGEMENT_ROLE)

class OrganizationController extends Controller {
  async getAllOrganizations (ctx) {
    ctx.body = await ctx.service.organization.findByFilter(ctx.query)
  }

  async createOrganization (ctx) {
    const { user: currentUser } = ctx

    ctx.body = await ctx.service.organization.createWithUserId(ctx.request.body, currentUser.id)
  }

  async getAuthUserOrganizations (ctx) {
    const { user: currentUser } = ctx
    ctx.body = await ctx.service.management.findManagedOrgsByUserId(currentUser.id)
  }

  // async getUserOrganizations (ctx) {
  //   const user = await ctx.service.user.findByName(ctx.params.user)
  //   ctx.body = await ctx.service.registration.findManagedOrgs(user.id)
  // }

  async getOrganization (ctx) {
    ctx.body = await ctx.service.organization.findByName(ctx.params.org)
  }

  async updateOrganization (ctx) {
    const { user: currentUser } = ctx
    const organization = await ctx.service.organization.findByName(ctx.params.org)

    const management = await ctx.service.management.findOneByFilter({
      user: currentUser.id,
      organization: organization.id
    })

    if (management && MANAGER_ROLE_KEYS.indexOf(management.role) >= 0) {
      ctx.body = await ctx.service.organization.updateById(organization.id, ctx.request.body)
    } else {
      // TODO: return error
      // ctx.status = 302
      // ctx.body = 'Now Access Right'
    }
  }
}

module.exports = OrganizationController
