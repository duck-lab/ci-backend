'use strict'

const Controller = require('egg').Controller

class EventController extends Controller {
  async getAllEvents (ctx) {
    ctx.body = await ctx.service.event.findByFilter(ctx.query)
  }

  async createEvent (ctx) {
    ctx.body = await ctx.service.event.create(ctx.request.body)
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
    // TODO: check management
    const event = await ctx.service.event.findByName(ctx.params.event)
    ctx.body = await ctx.service.event.updateById(event.id, ctx.request.body)
  }
}

module.exports = EventController
