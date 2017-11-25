'use strict'

module.exports = app => {
  class UsersService extends app.Service {
    async find (filter) {
      let data = await this.ctx.model.User.find(filter)
      let result = {}
      result.meta = {total: data.length}
      result.data = data
      return result
    }

    async findById (id) {
      let data = await this.ctx.model.User.findById(id)
      return data
    }

    async create (info) {
      if (!info) { return }
      let data = await this.ctx.model.User.create(info)
      return data
    }

    async update (id, info) {
      let data = await this.ctx.model.User.findOneAndUpdate({_id: id},
        {$set: info}, {new: true})
      return data
    }

    async destroy (ids) {
      if (!ids || !ids.length > 0) { return }
      let data = await this.ctx.model.User.deleteMany({_id: {$in: ids}})
      return data.result
    }
  }

  return UsersService
}
