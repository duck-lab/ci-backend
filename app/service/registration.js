'use strict'

module.exports = app => {
  class RegistrationService extends app.Service {
    async findRegistedEventsByFilter (filter) {
      let data = await this.ctx.model.Registration.find(filter).sort('field -createdAt').populate('event')
      let result = {}
      result.meta = {total: data.length}
      result.data = data
      return result
    }

    async findRegistedUsersByFilter (filter) {
      let data = await this.ctx.model.Registration.find(filter).sort('field -createdAt').populate('user')
      let result = {}
      result.meta = {total: data.length}
      result.data = data
      return result
    }

    async findRegistrationByCode (code) {
      let data = await this.ctx.model.Registration.findOne({registCode: code}).populate(['user', 'event'])
      return data
    }

    async create (registration) {
      if (!registration) { return }
      let data = await this.ctx.model.Registration.create(registration)
      return data
    }

    async updateByFilter (filter, info) {
      let data = await this.ctx.model.Registration.findOneAndUpdate(filter,
        {$set: info}, {new: true})
      return data
    }

    async destroyByFilter (filter) {
      let data = await this.ctx.model.Registration.deleteOne(filter)
      return data
    }
  }
  return RegistrationService
}
