'use strict'

module.exports = app => {
  class UsersService extends app.Service {
    async find (filter) {
      let data = await this.ctx.model.User.find({filter})
      let result = {}
      result.meta = {total: data.length}
      result.data = data
      return result
    }

    async findById (uid) {
      let data = await this.ctx.model.User.findById(uid)
      return data
    }

    async create (user) {
      if (!user) { return }
      let data = await this.ctx.model.User.create(user)
      return data
    }

    async update (uid, info) {
      let data = await this.ctx.model.User.findOneAndUpdate({_id: uid},
        {$set: info}, {new: true})
      return data
    }

    async destroy (uids) {
      if (!uids || !uids.length > 0) { return }
      let data = await this.ctx.model.User.deleteMany({_id: {$in: uids}})
      return data.result
    }
  }

  return UsersService
}
