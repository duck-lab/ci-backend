'use strict'

const bcrypt = require('bcrypt')
const Joi = require('joi')

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

    async verifyUser (username, password) {
      const data = await this.ctx.model.User.find({username})
      const user = data[0]
      if (!user) return null
      const isVerified = await bcrypt.compare(password, user.hashedPassword)
      return isVerified ? user : null
    }

    async create (info) {
      if (!info) { return }
      // Encrypt password
      const hashedPassword = await bcrypt.hash(info.password, app.config.auth.saltRounds)
      let data = await this.ctx.model.User.create(Object.assign(info, {hashedPassword}))
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
