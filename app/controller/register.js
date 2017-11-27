'use strict'

const Controller = require('egg').Controller

class RegisterController extends Controller {
  async getEventRegisters (ctx) {
    ctx.body = await ctx.service.Register.find({
      event: ctx.params.event
    })
  }

  async createRegisterByMobile (ctx) {
    // TODO: verify mobile
    ctx.body = await ctx.service.Register.create({
      event: ctx.params.event,
      mobile: ctx.query.mobile
    })
  }

  async checkInRegisterByMobile (ctx) {
    const register = await ctx.service.Register.find({
      event: ctx.params.event,
      mobile: ctx.query.mobile
    }).data[0]
    ctx.body = await ctx.service.register.update(register.id, {isRegisted: true})
  }

  async createRegister (ctx) {
    // TODO: verify user
    ctx.body = await ctx.service.Register.create({
      event: ctx.params.event,
      user: ctx.params.user
    })
  }

  async checkInRegister (ctx) {
    // TODO: check user
    const register = await ctx.service.Register.find({
      event: ctx.params.event,
      user: ctx.params.user
    }).data[0]
    ctx.body = await ctx.service.register.update(register.id, {isRegisted: true})
  }

  async removeRegister (ctx) {
    const register = await ctx.service.Register.find({
      event: ctx.params.event,
      user: ctx.params.user
    }).data[0]
    ctx.body = await ctx.service.register.destroy(register.id)
  }
}

module.exports = RegisterController
