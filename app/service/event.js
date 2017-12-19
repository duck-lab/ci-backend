'use strict'

const { MANAGEMENT_ROLE } = require('../public/enum')

module.exports = app => {
  class EventService extends app.Service {
    async findByFilter (filter) {
      let data = await this.ctx.model.Event.find(filter).sort('field -eventStartAt')
      let result = {}
      result.meta = {total: data.length}
      result.data = data
      return result
    }

    async findById (id) {
      let data = await this.ctx.model.Event.findById(id)
      return data
    }

    async findByName (name) {
      let data = await this.ctx.model.Event.findOne({title: name})
      return data
    }

    async createWithUserId (info, uid) {
      if (!info || !uid) { return }
      const user = await this.ctx.model.User.findById(uid)
      if (!user) return

      const event = await this.ctx.model.Event.create(info)
      await this.ctx.service.management.create({
        user: user.id,
        event: event.id,
        role: MANAGEMENT_ROLE.OWNER
      })
      return event
    }

    async updateById (id, info) {
      let data = await this.ctx.model.Event.findOneAndUpdate({_id: id},
        {$set: info}, {new: true})
      return data
    }
  }

  return EventService
}
