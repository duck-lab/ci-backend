'use strict'

const Controller = require('egg').Controller

class EventController extends Controller {
  async getAllEvents (ctx) {
    ctx.body = await ctx.service.event.findByFilter(ctx.query)
  }

  async createEvent (ctx) {
    const { user: currentUser } = ctx

    ctx.body = await ctx.service.event.createWithUserId(ctx.request.body, currentUser.id)
  }

  async getAuthUserEvents (ctx) {
    const { user: currentUser } = ctx

    ctx.body = await ctx.service.registration.findRegistedEventsByFilter({
      user: currentUser.id
    })
  }

  async getUserEvents (ctx) {
    const result = await ctx.service.user.findByFilter({
      username: ctx.params.username
    })
    const user = result.data[0]
    ctx.body = await ctx.service.registration.findRegistedEventsByFilter({
      user: user.id
    })
  }

  async getEvent (ctx) {
    ctx.body = await ctx.service.event.findByName(ctx.params.event)
  }

  async updateAnEvent (ctx) {
    // const { user: currentUser } = ctx
    // TODO: add logic

    const event = await ctx.service.event.findByName(ctx.params.event)
    ctx.body = await ctx.service.event.updateById(event.id, ctx.request.body)
  }
}

module.exports = EventController
