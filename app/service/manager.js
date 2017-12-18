'use strict'

module.exports = app => {
  class ManagerService extends app.Service {
    async findOneByFilter (filter) {
      let data = await this.ctx.model.Manager.findOne(filter)
      return data
    }

    async create (registration) {
      if (!registration) { return }
      // TODO: exist event or Organization only
      let data = await this.ctx.model.Manager.create(registration)
      return data
    }

    async updateByFilter (filter, info) {
      let data = await this.ctx.model.Manager.findOneAndUpdate(filter,
        {$set: info}, {new: true})
      return data
    }

    async destroyByFilter (filter) {
      let data = await this.ctx.model.Manager.deleteOne(filter)
      return data
    }
  }
  return ManagerService
}
