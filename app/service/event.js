'use strict'

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

    async create (info) {
      if (!info) { return }
      let data = await this.ctx.model.Event.create(info)
      return data
    }

    async updateById (id, info) {
      let data = await this.ctx.model.Event.findOneAndUpdate({_id: id},
        {$set: info}, {new: true})
      return data
    }
  }

  return EventService
}
