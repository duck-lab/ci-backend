'use strict'

const Controller = require('egg').Controller

class RegistrationController extends Controller {
  async getEventRegistrations (ctx) {
    const event = await ctx.service.event.findByName(ctx.params.event)
    ctx.body = await ctx.service.registration.findRegistedUsersByFilter({event: event.id})
  }

  async createAuthUserRegistration (ctx) {
    const { user: currentUser } = ctx
    const event = await ctx.service.event.findByName(ctx.params.event)
    // TODO: add regist logic
    ctx.body = await ctx.service.event.create({user: currentUser.id, event: event.id})
  }

  async getAuthUserEvents (ctx) {
    const { user: currentUser } = ctx
    ctx.body = await ctx.service.registration.findRegistedEventsByFilter({user: currentUser.id})
  }

  async createRegistration (ctx) {
    const user = await ctx.service.user.findByName(ctx.params.user)
    const event = await ctx.service.event.findByName(ctx.params.event)
    // TODO: add regist logic and init data
    ctx.body = await ctx.service.registration.create({
      event: event.id,
      user: user.id
    })
  }

  async checkInAuthUserRegistration (ctx) {
    const { user: currentUser } = ctx
    const event = await ctx.service.event.findByName(ctx.params.event)
    ctx.body = await ctx.service.registration.updateByFilter({
      event: event.id,
      user: currentUser.id
    }, {isRegisted: true})
  }

  async checkInRegistration (ctx) {
    const user = await ctx.service.user.findByName(ctx.params.user)
    const event = await ctx.service.event.findByName(ctx.params.event)
    ctx.body = await ctx.service.registration.updateByFilter({
      event: event.id,
      user: user.id
    }, {isRegisted: true})
  }

  async cancelAuthUserRegistration (ctx) {
    const { user: currentUser } = ctx
    const event = await ctx.service.event.findByName(ctx.params.event)
    ctx.body = await ctx.service.registration.updateByFilter({
      event: event.id,
      user: currentUser.id
    }, {isRegisted: false})
  }

  async cancelRegistration (ctx) {
    const user = await ctx.service.user.findByName(ctx.params.user)
    const event = await ctx.service.event.findByName(ctx.params.event)
    ctx.body = await ctx.service.registration.updateByFilter({
      event: event.id,
      user: user.id
    }, {isRegisted: false})
  }

  async removeRegistration (ctx) {
    const user = await ctx.service.user.findByName(ctx.params.user)
    const event = await ctx.service.event.findByName(ctx.params.event)
    ctx.body = await ctx.service.registration.destroyByFilter({
      event: event.id,
      user: user.id
    })
  }
}

module.exports = RegistrationController
