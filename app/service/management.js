'use strict'

module.exports = app => {
  class ManagementService extends app.Service {
    async findOneByFilter (filter) {
      let data = await this.ctx.model.Management.findOne(filter)
      return data
    }

    async create (registration) {
      if (!registration) { return }
      // TODO: exist event or Organization only
      let data = await this.ctx.model.Management.create(registration)
      return data
    }

    async updateByFilter (filter, info) {
      let data = await this.ctx.model.Management.findOneAndUpdate(filter,
        {$set: info}, {new: true})
      return data
    }

    async destroyByFilter (filter) {
      let data = await this.ctx.model.Management.deleteOne(filter)
      return data
    }
  }
  return ManagementService
}
