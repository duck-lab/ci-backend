'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('Manager Service', () => {
  let createdManager = null
  let rUser = null
  let rEvent = null
  let testManager1 = null

  before(() => {
    const ctx = app.mockContext()

    ctx.model.Manager.collection.drop()
  })

  describe('Create', () => {
    const testUser1 = {
      password: 'regTestPassword',
      secretSalt: 'regTestSalt',
      mobile: '+86 18303033222',
      email: 'ole301@gmail.com',
      username: 'ole3022',
      realName: 'Oliver.W',
      country: 'China',
      province: '上海',
      city: '上海',
      address: '静安区'
    }

    const testEvent1 = {
      title: 'manTestEvnet',
      postImage: 'manTestImage',
      eventStartAt: new Date('2017-11-20'),
      eventEndAt: new Date('2017-11-21'),
      checkInStartAt: new Date('2017-11-20'),
      checkInEndAt: new Date('2017-11-20'),
      country: 'China',
      province: '上海',
      city: '上海',
      address: '静安区',
      checkInType: 'QR_CODE_GENERAL'
    }

    before(async () => {
      const ctx = app.mockContext()

      rUser = await ctx.service.user.create(testUser1)
      rEvent = await ctx.service.event.create(testEvent1)

      testManager1 = {
        user: rUser.id,
        event: rEvent.id,
        role: 'ADMIN'
      }
    })

    it('should create manager', async () => {
      const ctx = app.mockContext()

      const manager = await ctx.service.manager.create(testManager1)
      createdManager = manager
      assert(createdManager)
      assert.equal(createdManager.user, rUser.id)
      assert.equal(createdManager.event, rEvent.id)
      assert.equal(createdManager.role, 'ADMIN')
    })
  })

  describe('Find', () => {
    it('should get manager by user and event', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.manager.find({user: rUser.id, event: rEvent.id})
      const managerInfo = result.data[0]

      assert(result)
      assert(managerInfo)
      assert.equal(result.meta.total, 1)

      assert.equal(managerInfo.user, rUser.id)
      assert.equal(managerInfo.event, rEvent.id)
      assert.equal(managerInfo.role, 'ADMIN')
    })

    it('should get manager with userId', async () => {
      const ctx = app.mockContext()

      const manager = await ctx.service.manager.findById(createdManager.id)
      assert(manager)
      assert.equal(manager.user, rUser.id)
      assert.equal(manager.event, rEvent.id)
      assert.equal(manager.role, 'ADMIN')
    })
  })

  describe('Update', () => {
    it('should update manager several fileds with id', async () => {
      const ctx = app.mockContext()

      const manager = await ctx.service.manager.update(createdManager.id, {
        role: 'VIEWER'
      })

      assert(manager)
      assert.equal(manager.user, rUser.id)
      assert.equal(manager.event, rEvent.id)
      assert.equal(manager.role, 'VIEWER')
    })
  })

  describe('Delete', () => {
    it('should delete manager in the list of uids', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.manager.destroy([createdManager.id])

      assert(result)
      assert.equal(result.n, result.ok)
    })
  })
})
