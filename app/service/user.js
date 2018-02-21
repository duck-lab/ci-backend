'use strict'

const bcrypt = require('bcrypt')
// const Joi = require('joi')

module.exports = app => {
  class UserService extends app.Service {
    async findByFilter (filter) {
      let data = await this.ctx.model.User.find(filter).sort('field -createdAt')
      let result = {}
      result.meta = {total: data.length}
      result.data = data
      return result
    }

    async findById (id) {
      let data = await this.ctx.model.User.findById(id)
      return data
    }

    async findByName (name) {
      let data = await this.ctx.model.User.findOne({ username: name })
      return data
    }

    // TODO: ADD COV TEST
    async findByOpenId (openId) {
      let data = await this.ctx.model.User.findOne({ wechatOpenId: openId })
      return data
    }

    async verifyUser (username, password) {
      const user = await this.ctx.model.User.findOne({ $or: [
        { email: username },
        { username: username }
      ]})
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

    async updateById (id, info) {
      if (info.password) {
        // Encrypt password
        info.hashedPassword = await bcrypt.hash(info.password, app.config.auth.saltRounds)
        delete info.password
      }

      let data = await this.ctx.model.User.findOneAndUpdate({_id: id},
        {$set: info}, {new: true})
      return data
    }

    async banById (id) {
      let data = await this.ctx.model.User.findOneAndUpdate({_id: id}, {$set: {isBanned: true}}, {new: true})
      return data
    }

    async banByUsername (username) {
      let data = await this.ctx.model.User.findOneAndUpdate({username: username}, {$set: {isBanned: true}}, {new: true})
      return data
    }
  }

  return UserService
}
