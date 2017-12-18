'use strict'

module.exports = app => {
  class RegisterService extends app.Service {
    async findRegistedEventsByFilter (filter) {
      let data = await this.ctx.model.Register.find(filter).sort('field -createdAt').populate('event')
      let result = {}
      result.meta = {total: data.length}
      result.data = data
      return result
    }

    async findRegistedUsersByFilter (filter) {
      let data = await this.ctx.model.Register.find(filter).sort('field -createdAt').populate('user')
      let result = {}
      result.meta = {total: data.length}
      result.data = data
      return result
    }

    async findRegisterByCode (code) {
      let data = await this.ctx.model.Register.findOne({registCode: code}).populate(['user', 'event'])
      return data
    }

    async create (register) {
      if (!register) { return }
      let data = await this.ctx.model.Register.create(register)
      return data
    }

    async updateByFilter (filter, info) {
      let data = await this.ctx.model.Register.findOneAndUpdate(filter,
        {$set: info}, {new: true})
      return data
    }

    async destroyByFilter (filter) {
      let data = await this.ctx.model.Register.deleteOne(filter)
      return data
    }
  }
  return RegisterService
}
