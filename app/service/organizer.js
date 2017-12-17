'use strict'

module.exports = app => {
  class OrganizerService extends app.Service {
    async findByFilter (filter) {
      let data = await this.ctx.model.Organizer.find(filter)
      let result = {}
      result.meta = {total: data.length}
      result.data = data
      return result
    }

    async findById (id) {
      let data = await this.ctx.model.Organizer.findById(id)
      return data
    }

    async findByName (name) {
      let data = await this.ctx.model.Organizer.findOne({name})
      return data
    }

    async create (register) {
      if (!register) { return }
      let data = await this.ctx.model.Organizer.create(register)
      return data
    }

    async updateById (id, info) {
      let data = await this.ctx.model.Organizer.findOneAndUpdate({_id: id},
        {$set: info}, {new: true})
      return data
    }

    async destroyByFilter (filter) {
      let data = await this.ctx.model.Organizer.deleteOne(filter)
      return data
    }
  }
  return OrganizerService
}
