'use strict'

module.exports = app => {
  class EventService extends app.Service {
    async find (filter) {
      let data = await this.ctx.model.Event.find(filter)
      let result = {}
      result.meta = {total: data.length}
      result.data = data
      return result
    }

    async findById (id) {
      let data = await this.ctx.model.Event.findById(id)
      return data
    }

    async create (info) {
      if (!info) { return }
      let data = await this.ctx.model.Event.create(info)
      return data
    }

    async update (id, info) {
      let data = await this.ctx.model.Event.findOneAndUpdate({_id: id},
        {$set: info}, {new: true})
      return data
    }

    async destroy (ids) {
      if (!ids || !ids.length > 0) { return }
      let data = await this.ctx.model.Event.deleteMany({_id: {$in: ids}})
      return data.result
    }
  }

  return EventService
}
