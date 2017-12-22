'use strict'

const { app, assert } = require('egg-mock/bootstrap')
const { flashDB, fixData } = require('../../fixtures/db')
const managementSource = require('../../fixtures/data/service_management')

describe('Management Service', () => {
  let injectData = null
  let managementUser = null
  let managementEvent = null
  let managementOrganization = null

  before(() => flashDB(app.mongoose, 'checkIn_test')
    .then(() => fixData(app.mongoose, managementSource))
    .then((result) => { injectData = result }))

  describe('Create', () => {
    it('should create event management', async () => {
      const ctx = app.mockContext()

      managementUser = await ctx.service.user.findByName('ole3021')
      managementEvent = await ctx.service.event.findByName('DucklabEvnet')

      const testManagement = {
        user: managementUser.id,
        event: managementEvent.id,
        role: 'ADMIN'
      }

      const management = await ctx.service.management.create(testManagement)
      assert(management)
      assert.equal(management.user, managementUser.id)
      assert.equal(management.event, managementEvent.id)
      assert.equal(management.role, 'ADMIN')
    })

    it('should create event management', async () => {
      const ctx = app.mockContext()

      managementUser = await ctx.service.user.findByName('ole3021')
      managementOrganization = await ctx.service.organization.findByName('Ducklab')

      const testManagement = {
        user: managementUser.id,
        organization: managementOrganization.id,
        role: 'ADMIN'
      }

      const management = await ctx.service.management.create(testManagement)
      assert(management)
      assert.equal(management.user, managementUser.id)
      assert.equal(management.organization, managementOrganization.id)
      assert.equal(management.role, 'ADMIN')
    })
  })

  describe('Find', () => {
    it('should find one event management by filter', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.management.findOneByFilter({user: managementUser.id, event: managementEvent.id})

      assert(result)

      assert.equal(result.user, managementUser.id)
      assert.equal(result.event, managementEvent.id)
      assert.equal(result.role, 'ADMIN')
    })

    it('should find one Organization management by filter', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.management.findOneByFilter({
        user: managementUser.id,
        organization: managementOrganization.id
      })

      assert(result)

      assert.equal(result.user, managementUser.id)
      assert.equal(result.organization, managementOrganization.id)
      assert.equal(result.role, 'ADMIN')
    })

    it('should find all managers by eventid', async () => {
      const ctx = app.mockContext()
      const result = await ctx.service.management.findManagersByEventId(injectData.Event[1].id)

      assert.equal(result.meta.total, 2)
      assert.equal(result.data[0].user.username, 'oliver')
      assert.equal(result.data[0].user.realName, 'Oliver.Z')
      assert.equal(result.data[0].user.country, 'England')
      assert.equal(result.data[0].user.city, 'York')
      assert.equal(result.data[1].user.username, 'ole3021')
      assert.equal(result.data[1].user.realName, 'Oliver.W')
      assert.equal(result.data[1].user.country, 'China')
      assert.equal(result.data[1].user.city, '上海')
    })
  })

  describe('Update', () => {
    it('should update event management several fileds with filter', async () => {
      const ctx = app.mockContext()

      const management = await ctx.service.management.updateByFilter({
        user: managementUser.id,
        event: managementEvent.id
      }, {
        role: 'VIEWER'
      })

      assert(management)
      assert.equal(management.user, managementUser.id)
      assert.equal(management.event, managementEvent.id)
      assert.equal(management.role, 'VIEWER')
    })

    it('should update Organization management several fileds with filter', async () => {
      const ctx = app.mockContext()

      const management = await ctx.service.management.updateByFilter({
        user: managementUser.id,
        organization: managementOrganization.id
      }, {
        role: 'VIEWER'
      })

      assert(management)
      assert.equal(management.user, managementUser.id)
      assert.equal(management.organization, managementOrganization.id)
      assert.equal(management.role, 'VIEWER')
    })
  })

  describe('Delete', () => {
    it('should delete management by filter', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.management.destroyByFilter({
        user: managementUser.id,
        organization: managementOrganization.id
      })

      assert(result)
      assert.equal(result.n, result.ok)
    })
  })
})
