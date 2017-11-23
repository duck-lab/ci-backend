'use strict'

module.exports = app => {
  class UsersService extends app.Service {
    async find (filter) {
      let users = await this.ctx.model.users.find({filter})
      let result = {}
      result.meta = {total: users.length}
      result.data = users
      return result
    }

    async findById (uid) {
      let result = await this.ctx.model.users.findById(uid)
      return result
    }

    async create (user) {
      if (!user) { return }
      let result = await this.ctx.model.users.create(user)
      return result
    }

    async update (uid, info) {
      let result = await this.ctx.model.users.findOneAndUpdate({id: uid}, {$set: info})
      return result
    }

    async destroy (uids) {
      if (!uids || !uids.length > 0) { return }
      let result = await this.ctx.model.users.remove({id: {$in: uids}})
      return result.result
    }
  }

  return UsersService
}
