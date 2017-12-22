'use strict'

const Controller = require('egg').Controller
const { MANAGEMENT_ROLE } = require('../public/enum')

const MANAGER_ROLE_KEYS = Object.keys(MANAGEMENT_ROLE)

class RegistrationController extends Controller {
  async getEventRegistrations (ctx) {
    // TODO: 针对管理员和普通用户进行不同的数据返回
    const event = await ctx.service.event.findByName(ctx.params.event)
    ctx.body = await ctx.service.registration.findRegistedUsersByFilter({event: event.id})
  }

  async createAuthUserRegistration (ctx) {
    const { user: currentUser } = ctx

    const event = await ctx.service.event.findByName(ctx.params.event)

    if (event.isSelfRegistry) {
      ctx.body = await ctx.service.registration.create({
        user: currentUser.id,
        event: event.id,
        mobile: currentUser.mobile || undefined
      })
    } else {
      // ctx.status = 302
      // ctx.body = 'Not able to regist'
    }
  }

  async createRegistration (ctx) {
    const { user: currentUser } = ctx
    let targetUser = null
    if (ctx.params.user) {
      targetUser = await ctx.service.user.findByName(ctx.params.user)
    } else {
      // return
    }
    const event = await ctx.service.event.findByName(ctx.params.event)
    const management = await ctx.service.management.findOneByFilter({
      user: currentUser.id,
      event: event.id
    })

    if (targetUser && management && MANAGER_ROLE_KEYS.indexOf(management.role) >= 0) {
      ctx.body = await ctx.service.registration.create({
        user: targetUser.id,
        event: event.id,
        mobile: targetUser.mobile || undefined
      })
    } else {
      // ctx.status = 302
      // ctx.body = 'Not able to registry'
    }
  }

  async checkInAuthUserRegistration (ctx) {
    const { user: currentUser } = ctx
    const event = await ctx.service.event.findByName(ctx.params.event)

    if (event.isSelfCheckIn) {
      ctx.body = await ctx.service.registration.updateByFilter({
        event: event.id,
        user: currentUser.id
      }, {isRegisted: true})
    } else {
      // ctx.status = 302
      // ctx.body = 'Not able to self registry'
    }
  }

  async checkInRegistration (ctx) {
    const { user: currentUser } = ctx
    const event = await ctx.service.event.findByName(ctx.params.event)
    const management = await ctx.service.management.findOneByFilter({
      user: currentUser.id,
      event: event.id
    })

    const targetUser = await ctx.service.user.findByName(ctx.params.user)
    const registration = await ctx.service.registration.findRegistrationByFilter({
      user: targetUser.id,
      event: event.id
    })
    if (registration && targetUser && management && MANAGER_ROLE_KEYS.indexOf(management.role) >= 0) {
      ctx.body = await ctx.service.registration.updateByFilter({
        event: event.id,
        user: targetUser.id
      }, {isRegisted: true})
    } else {
      // ctx.status = 302
      // ctx.body = 'Not able to registry'
    }
  }

  async cancelAuthUserRegistration (ctx) {
    const { user: currentUser } = ctx
    const event = await ctx.service.event.findByName(ctx.params.event)

    if (event.isSelfCheckIn) {
      ctx.body = await ctx.service.registration.updateByFilter({
        event: event.id,
        user: currentUser.id
      }, {isRegisted: false})
    } else {
      // ctx.status = 302
      // ctx.body = 'Not able to self registry'
    }
  }

  async cancelRegistration (ctx) {
    const { user: currentUser } = ctx
    const event = await ctx.service.event.findByName(ctx.params.event)
    const management = await ctx.service.management.findOneByFilter({
      user: currentUser.id,
      event: event.id
    })

    const targetUser = await ctx.service.user.findByName(ctx.params.user)
    const registration = await ctx.service.registration.findRegistrationByFilter({
      user: targetUser.id,
      event: event.id
    })
    if (registration && targetUser && management && MANAGER_ROLE_KEYS.indexOf(management.role) >= 0) {
      ctx.body = await ctx.service.registration.updateByFilter({
        event: event.id,
        user: targetUser.id
      }, {isRegisted: false})
    } else {
      // ctx.status = 302
      // ctx.body = 'Not able to registry'
    }
  }

  async removeRegistration (ctx) {
    const { user: currentUser } = ctx
    const event = await ctx.service.event.findByName(ctx.params.event)
    const management = await ctx.service.management.findOneByFilter({
      user: currentUser.id,
      event: event.id
    })

    const targetUser = await ctx.service.user.findByName(ctx.params.user)
    if (targetUser && management && MANAGER_ROLE_KEYS.indexOf(management.role) >= 0) {
      ctx.body = await ctx.service.registration.destroyByFilter({
        event: event.id,
        user: targetUser.id
      })
    } else {
      // ctx.status = 302
      // ctx.body = 'Not able to registry'
    }
  }
}

module.exports = RegistrationController
