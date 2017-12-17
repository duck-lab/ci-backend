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

  describe('Find', () => {
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
    it('should update user several fileds with id', async () => {
      const ctx = app.mockContext()

      const user = await ctx.service.user.updateById(createdUser.id, {
        realName: 'updatedName',
        mobile: 'updateMobile'
      })

      assert(user)
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
    it('should ban user by id', async () => {
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
