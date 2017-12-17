'use strict'

const Controller = require('egg').Controller

class RegisterController extends Controller {
  async getEventRegisters (ctx) {
    const event = await ctx.service.event.findByName(ctx.params.event)
    ctx.body = await ctx.service.register.findRegistedUsersByFilter({event: event.id})
  }

  async createAuthUserRegister (ctx) {
    const { user: currentUser } = ctx
    const event = await ctx.service.event.findByName(ctx.params.event)
    // TODO: add regist logic
    ctx.body = await ctx.service.event.create({user: currentUser.id, event: event.id})
  }

  async getAuthUserEvents (ctx) {
    const { user: currentUser } = ctx
    ctx.body = await ctx.service.register.findRegistedEventsByFilter({user: currentUser.id})
  }

  async createRegister (ctx) {
    const user = await ctx.service.user.findByName(ctx.params.user)
    const event = await ctx.service.event.findByName(ctx.params.event)
    // TODO: add regist logic and init data
    ctx.body = await ctx.service.register.create({
      event: event.id,
      user: user.id
    })
  }

  async checkInAuthUserRegister (ctx) {
    const { user: currentUser } = ctx
    const event = await ctx.service.event.findByName(ctx.params.event)
    ctx.body = await ctx.service.register.updateByFilter({
      event: event.id,
      user: currentUser.id
    }, {isRegisted: true})
  }

  async checkInRegister (ctx) {
    const user = await ctx.service.user.findByName(ctx.params.user)
    const event = await ctx.service.event.findByName(ctx.params.event)
    ctx.body = await ctx.service.register.updateByFilter({
      event: event.id,
      user: user.id
    }, {isRegisted: true})
  }

  async cancelAuthUserRegister (ctx) {
    const { user: currentUser } = ctx
    const event = await ctx.service.event.findByName(ctx.params.event)
    ctx.body = await ctx.service.register.updateByFilter({
      event: event.id,
      user: currentUser.id
    }, {isRegisted: false})
  }

  async cancelRegister (ctx) {
    const user = await ctx.service.user.findByName(ctx.params.user)
    const event = await ctx.service.event.findByName(ctx.params.event)
    ctx.body = await ctx.service.register.updateByFilter({
      event: event.id,
      user: user.id
    }, {isRegisted: false})
  }

  async removeRegister (ctx) {
    const user = await ctx.service.user.findByName(ctx.params.user)
    const event = await ctx.service.event.findByName(ctx.params.event)
    ctx.body = await ctx.service.register.destroyByFilter({
      event: event.id,
      user: user.id
    })
  }
}

module.exports = RegisterController
