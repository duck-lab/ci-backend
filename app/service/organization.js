'use strict'

const { MANAGEMENT_ROLE } = require('../public/enum')

module.exports = app => {
  class OrganizationService extends app.Service {
    async findByFilter (filter) {
      let data = await this.ctx.model.Organization.find(filter)
      let result = {}
      result.meta = {total: data.length}
      result.data = data
      return result
    }

    async findById (id) {
      let data = await this.ctx.model.Organization.findById(id)
      return data
    }

    async findByName (name) {
      let data = await this.ctx.model.Organization.findOne({name})
      return data
    }

    async createWithUserId (info, uid) {
      if (!info || !uid) { return }
      const user = await this.ctx.model.User.findById(uid)
      if (!user) return
      let organization = await this.ctx.model.Organization.create(info)

      await this.ctx.service.management.create({
        user: user.id,
        organization: organization.id,
        role: MANAGEMENT_ROLE.OWNER
      })
      return organization
    }

    async updateById (id, info) {
      let data = await this.ctx.model.Organization.findOneAndUpdate({_id: id},
        {$set: info}, {new: true})
      return data
    }

    async destroyByFilter (filter) {
      let data = await this.ctx.model.Organization.deleteOne(filter)
      return data
    }
  }
  return OrganizationService
}
