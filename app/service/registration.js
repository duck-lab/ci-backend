'use strict'

const generateUID = require('nanoid/generate')
const Hashids = require('hashids')
const hashids = new Hashids('', 0, '23456789ABCDEFGHJKMNOPQRSTUVWXYZ')

module.exports = app => {
  class RegistrationService extends app.Service {
    async findRegistrationByFilter (filter) {
      let data = await this.ctx.model.Registration.findOne(filter).populate(['user', 'event'])
      return data
    }

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
      const data = new this.ctx.model.Registration(registration)
      data.registCode = hashids.encode(generateUID('1234567890', 7))

      await data.save()
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
