'use strict'

const Controller = require('egg').Controller
const { MANAGEMENT_ROLE } = require('../public/enum')

const MANAGER_ROLE_KEYS = Object.keys(MANAGEMENT_ROLE)

class ManagementController extends Controller {
  async getEventManagements (ctx) {
    const event = await ctx.service.event.findByName(ctx.params.event)
    ctx.body = await ctx.service.management.findManagersByEventId(event.id)
  }

  async createEventManagement (ctx) {
    const { user: currentUser } = ctx

    const event = await ctx.service.event.findByName(ctx.params.event)
    const management = await this.ctx.service.management.findOneByFilter({
      user: currentUser.id,
      event: event.id
    })
    const targetUser = await ctx.service.user.findByName(ctx.params.user)

    if (targetUser && management && MANAGER_ROLE_KEYS.indexOf(management.role) >= 0) {
      // should in lower ctx.request.body.role
      ctx.body = await ctx.service.management.create({
        event: event.id,
        user: targetUser.id,
        role: ctx.request.body.role
      })
    } else {
      // ctx.status = 302
      // ctx.body = 'Faile to create management'
    }
  }

  async udpateEventManagement (ctx) {
    const { user: currentUser } = ctx

    const event = await ctx.service.event.findByName(ctx.params.event)
    const management = await this.ctx.service.management.findOneByFilter({
      user: currentUser.id,
      event: event.id
    })
    const targetUser = await ctx.service.user.findByName(ctx.params.user)

    if (targetUser && management && MANAGER_ROLE_KEYS.indexOf(management.role) >= 0) {
      // should in lower ctx.request.body.role
      ctx.body = await ctx.service.management.updateByFilter({
        user: targetUser.id,
        event: event.id
      }, ctx.request.body)
    } else {
      // ctx.status = 302
      // ctx.body = 'Faile to create management'
    }
  }

  async removeEventManagement (ctx) {
    const { user: currentUser } = ctx

    const event = await ctx.service.event.findByFilter({title: ctx.params.event})
    const management = await this.ctx.service.management.findOneByFilter({
      user: currentUser.id,
      event: event.id
    })
    const targetUser = await ctx.service.user.findByFilter({username: ctx.params.user})

    if (targetUser && management && MANAGER_ROLE_KEYS.indexOf(management.role) >= 0) {
      // should in lower ctx.request.body.role
      ctx.body = await ctx.service.management.destroyByFilter({
        user: targetUser.id,
        event: event.id
      })
    } else {
      ctx.status = 302
      ctx.body = 'Faile to create management'
    }
  }

  async createOrgManagement (ctx) {
    const { user: currentUser } = ctx

    const organization = await ctx.service.organization.findByName(ctx.params.org)
    const management = await this.ctx.service.management.findOneByFilter({
      user: currentUser.id,
      organization: organization.id
    })
    const targetUser = await ctx.service.user.findByName(ctx.params.user)

    if (targetUser && management && MANAGER_ROLE_KEYS.indexOf(management.role) >= 0) {
      // should in lower ctx.request.body.role
      ctx.body = await ctx.service.management.create({
        organization: organization.id,
        user: targetUser.id,
        role: ctx.request.body.role
      })
    } else {
      // ctx.status = 302
      // ctx.body = 'Faile to create management'
    }
  }

  async udpateOrgManagement (ctx) {
    const { user: currentUser } = ctx

    const organization = await ctx.service.organization.findByName(ctx.params.org)
    const management = await this.ctx.service.management.findOneByFilter({
      user: currentUser.id,
      organization: organization.id
    })
    const targetUser = await ctx.service.user.findByName(ctx.params.user)

    if (targetUser && management && MANAGER_ROLE_KEYS.indexOf(management.role) >= 0) {
      // should in lower ctx.request.body.role
      ctx.body = await ctx.service.management.updateByFilter({
        user: targetUser.id,
        organization: organization.id
      }, ctx.request.body)
    } else {
      // ctx.status = 302
      // ctx.body = 'Faile to update management'
    }
  }

  async removeOrgManagement (ctx) {
    const { user: currentUser } = ctx

    const organization = await ctx.service.organization.findByFilter({name: ctx.params.org})
    const management = await this.ctx.service.management.findOneByFilter({
      user: currentUser.id,
      organization: organization.id
    })
    const targetUser = await ctx.service.user.findByFilter({username: ctx.params.user})

    if (targetUser && management && MANAGER_ROLE_KEYS.indexOf(management.role) >= 0) {
      // should in lower ctx.request.body.role
      ctx.body = await ctx.service.management.destroyByFilter({
        user: targetUser.id,
        organization: organization.id
      })
    } else {
      // ctx.status = 302
      // ctx.body = 'Faile to create management'
    }
  }
}

module.exports = ManagementController
