'use strict'

module.exports = app => {
  class ManagerService extends app.Service {
    async findByFilter (filter) {
      let data = await this.ctx.model.Manager.find(filter)
      let result = {}
      result.meta = {total: data.length}
      result.data = data
      return result
    }

    async findById (id) {
      let data = await this.ctx.model.Manager.findById(id)
      return data
    }

    async create (register) {
      if (!register) { return }
      let data = await this.ctx.model.Manager.create(register)
      return data
    }

    async updateById (id, info) {
      let data = await this.ctx.model.Manager.findOneAndUpdate({_id: id},
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
