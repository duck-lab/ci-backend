'use strict'

module.exports = app => {
  class UsersService extends app.Service {
    async find (filter) {
      let data = await this.ctx.model.Event.find({filter})
      let result = {}
      result.meta = {total: data.length}
      result.data = data
      return result
    }

    async findById (eid) {
      let data = await this.ctx.model.Event.findById(eid)
      return data
    }

    async create (event) {
      if (!event) { return }
      let data = await this.ctx.model.Event.create(event)
      return data
    }

    async update (eid, info) {
      let data = await this.ctx.model.Event.findOneAndUpdate({_id: eid},
        {$set: info}, {new: true})
      return data
    }

    async destroy (eids) {
      if (!eids || !eids.length > 0) { return }
      let data = await this.ctx.model.Event.deleteMany({_id: {$in: eids}})
      return data.result
    }
  }

  return UsersService
}
