'use strict'

const { app, assert } = require('egg-mock/bootstrap')
const { flashDB, fixData } = require('../../fixtures/db')
const managerSource = require('../../fixtures/data/service_manager')

describe('Manager Service', () => {
  let managerUser = null
  let managerEvent = null
  let managerOrganization = null

  before(() => flashDB(app.mongoose, 'checkIn_test')
  .then(fixData(app.mongoose, managerSource)))

  describe('Create', () => {
    it('should create event manager', async () => {
      const ctx = app.mockContext()

      managerUser = await ctx.service.user.findByName('ole3021')
      managerEvent = await ctx.service.event.findByName('DucklabEvnet')

      const testManager = {
        user: managerUser.id,
        event: managerEvent.id,
        role: 'ADMIN'
      }

      const manager = await ctx.service.manager.create(testManager)
      assert(manager)
      assert.equal(manager.user, managerUser.id)
      assert.equal(manager.event, managerEvent.id)
      assert.equal(manager.role, 'ADMIN')
    })

    it('should create event manager', async () => {
      const ctx = app.mockContext()

      managerUser = await ctx.service.user.findByName('ole3021')
      managerOrganization = await ctx.service.organization.findByName('Ducklab')

      const testManager = {
        user: managerUser.id,
        organization: managerOrganization.id,
        role: 'ADMIN'
      }

      const manager = await ctx.service.manager.create(testManager)
      assert(manager)
      assert.equal(manager.user, managerUser.id)
      assert.equal(manager.organization, managerOrganization.id)
      assert.equal(manager.role, 'ADMIN')
    })
  })

  describe('Find', () => {
    it('should find event manager by filter', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.manager.findOneByFilter({user: managerUser.id, event: managerEvent.id})

      assert(result)

      assert.equal(result.user, managerUser.id)
      assert.equal(result.event, managerEvent.id)
      assert.equal(result.role, 'ADMIN')
    })

    it('should find Organization manager by filter', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.manager.findOneByFilter({
        user: managerUser.id,
        organization: managerOrganization.id
      })

      assert(result)

      assert.equal(result.user, managerUser.id)
      assert.equal(result.organization, managerOrganization.id)
      assert.equal(result.role, 'ADMIN')
    })
  })

  describe('Update', () => {
    it('should update event manager several fileds with filter', async () => {
      const ctx = app.mockContext()

      const manager = await ctx.service.manager.updateByFilter({
        user: managerUser.id,
        event: managerEvent.id
      }, {
        role: 'VIEWER'
      })

      assert(manager)
      assert.equal(manager.user, managerUser.id)
      assert.equal(manager.event, managerEvent.id)
      assert.equal(manager.role, 'VIEWER')
    })

    it('should update Organization manager several fileds with filter', async () => {
      const ctx = app.mockContext()

      const manager = await ctx.service.manager.updateByFilter({
        user: managerUser.id,
        organization: managerOrganization.id
      }, {
        role: 'VIEWER'
      })

      assert(manager)
      assert.equal(manager.user, managerUser.id)
      assert.equal(manager.organization, managerOrganization.id)
      assert.equal(manager.role, 'VIEWER')
    })
  })

  describe('Delete', () => {
    it('should delete manager by filter', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.manager.destroyByFilter({
        user: managerUser.id,
        organization: managerOrganization.id
      })

      assert(result)
      assert.equal(result.n, result.ok)
    })
  })
})
