'use strict'

const Controller = require('egg').Controller
const { MANAGEMENT_ROLE } = require('../public/enum')

const MANAGER_ROLE_KEYS = Object.keys(MANAGEMENT_ROLE)

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
    const { user: currentUser } = ctx
    const event = await ctx.service.event.findByName(ctx.params.event)

    const management = await ctx.service.management.findOneByFilter({
      user: currentUser.id,
      event: event.id
    })

    if (management && MANAGER_ROLE_KEYS.indexOf(management.role) >= 0) {
      ctx.body = await ctx.service.event.updateById(event.id, ctx.request.body)
    } else {
      // TODO: return error
      // ctx.status = 302
      // ctx.body = 'Now Access Right'
    }
  }
}

module.exports = EventController
