'use strict'

const { app, assert } = require('egg-mock/bootstrap')
const { flashDB } = require('../../fixtures/db')

describe('User Service', () => {
  let createdUser = null

  before(() => flashDB(app.mongoose, 'checkIn_test'))

  describe('Create', () => {
    const testUser = {
      password: 'testPassword',
      mobile: '18303033030',
      email: 'ole3021@gmail.com',
      username: 'ole3021',
      realName: 'Oliver.W',
      country: 'China',
      province: '上海',
      city: '上海',
      address: '静安区'
    }
    it('should create user', async () => {
      const ctx = app.mockContext()

      const user = await ctx.service.user.create(testUser)
      createdUser = user
      assert(user)
      assert(user.hashedPassword)
      assert.equal(user.mobile, '18303033030')
      assert.equal(user.email, 'ole3021@gmail.com')
      assert.equal(user.username, 'ole3021')
      assert.equal(user.realName, 'Oliver.W')
      assert.equal(user.country, 'China')
      assert.equal(user.province, '上海')
      assert.equal(user.city, '上海')
      assert.equal(user.address, '静安区')
    })
  })

  describe('Verify', () => {
    it('should able to verify user with correct username and password', async () => {
      const ctx = app.mockContext()

      const user = await ctx.service.user.verifyUser('ole3021', 'testPassword')
      assert(user)
      assert.equal(user.mobile, '18303033030')
      assert.equal(user.email, 'ole3021@gmail.com')
      assert.equal(user.username, 'ole3021')
      assert.equal(user.realName, 'Oliver.W')
      assert.equal(user.country, 'China')
      assert.equal(user.province, '上海')
      assert.equal(user.city, '上海')
      assert.equal(user.address, '静安区')
    })

    it('shuold failed to verify with wrong username and password', async () => {
      const ctx = app.mockContext()

      const user = await ctx.service.user.verifyUser('ole3021', 'wrongPassword')
      assert.equal(user, null)
    })
  })

  describe('Find', () => {
    it('should find user by filter', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.user.findByFilter({username: 'ole3021'})
      const user = result.data[0]

      assert(user)
      assert.equal(user.mobile, '18303033030')
      assert.equal(user.email, 'ole3021@gmail.com')
      assert.equal(user.username, 'ole3021')
      assert.equal(user.realName, 'Oliver.W')
      assert.equal(user.country, 'China')
      assert.equal(user.province, '上海')
      assert.equal(user.city, '上海')
      assert.equal(user.address, '静安区')
    })

    it('should find user by username', async () => {
      const ctx = app.mockContext()

      const user = await ctx.service.user.findByName('ole3021')

      assert(user)
      assert.equal(user.mobile, '18303033030')
      assert.equal(user.email, 'ole3021@gmail.com')
      assert.equal(user.username, 'ole3021')
      assert.equal(user.realName, 'Oliver.W')
      assert.equal(user.country, 'China')
      assert.equal(user.province, '上海')
      assert.equal(user.city, '上海')
      assert.equal(user.address, '静安区')
    })

    it('should find user by userId', async () => {
      const ctx = app.mockContext()

      const user = await ctx.service.user.findById(createdUser.id)
      assert(user)
      assert.equal(user.mobile, '18303033030')
      assert.equal(user.email, 'ole3021@gmail.com')
      assert.equal(user.username, 'ole3021')
      assert.equal(user.realName, 'Oliver.W')
      assert.equal(user.country, 'China')
      assert.equal(user.province, '上海')
      assert.equal(user.city, '上海')
      assert.equal(user.address, '静安区')
    })
  })

  describe('Update', () => {
    it('should update user several fileds with userId', async () => {
      const ctx = app.mockContext()

      const user = await ctx.service.user.updateById(createdUser.id, {
        password: 'newPassword',
        realName: 'updatedName',
        mobile: 'updateMobile'
      })

      const isVerified = await ctx.service.user.verifyUser('ole3021', 'newPassword')

      assert(user)
      assert.equal(isVerified.username, 'ole3021')
      assert.equal(user.mobile, 'updateMobile')
      assert.equal(user.email, 'ole3021@gmail.com')
      assert.equal(user.username, 'ole3021')
      assert.equal(user.realName, 'updatedName')
      assert.equal(user.country, 'China')
      assert.equal(user.province, '上海')
      assert.equal(user.city, '上海')
      assert.equal(user.address, '静安区')
    })
  })

  describe('Ban', () => {
    it('should ban user by userId', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.user.banById(createdUser.id)

      assert(result)
      assert.equal(result.n, result.ok)
    })
    it('should ban user by username', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.user.banByUsername(createdUser.username)

      assert(result)
      assert.equal(result.n, result.ok)
    })
  })
})
