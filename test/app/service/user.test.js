'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('User Service', () => {
  let createdUser = null

  before(() => app.ready())
  after(() => {
    const ctx = app.mockContext()

    ctx.model.User.collection.drop()
  })

  describe('Create', () => {
    const testUser1 = {
      password: 'testPassword',
      secretSalt: 'testSecretSalt',
      mobile: '+86 18303033030',
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

      const user = await ctx.service.user.create(testUser1)
      createdUser = user
      assert(user)
      assert.equal(user.password, 'testPassword')
      assert.equal(user.secretSalt, 'testSecretSalt')
      assert.equal(user.mobile, '+86 18303033030')
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
    it('should get user by username', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.user.find({username: 'ole3021'})
      const userInfo = result.data[0]

      assert(result)
      assert(userInfo)
      assert.equal(result.meta.total, 1)

      assert.equal(userInfo.password, 'testPassword')
      assert.equal(userInfo.secretSalt, 'testSecretSalt')
      assert.equal(userInfo.mobile, '+86 18303033030')
      assert.equal(userInfo.email, 'ole3021@gmail.com')
      assert.equal(userInfo.username, 'ole3021')
      assert.equal(userInfo.realName, 'Oliver.W')
      assert.equal(userInfo.country, 'China')
      assert.equal(userInfo.province, '上海')
      assert.equal(userInfo.city, '上海')
      assert.equal(userInfo.address, '静安区')
    })

    it('should get user with userId', async () => {
      const ctx = app.mockContext()

      const user = await ctx.service.user.findById(createdUser.id)
      assert(user)
      assert.equal(user.password, 'testPassword')
      assert.equal(user.secretSalt, 'testSecretSalt')
      assert.equal(user.mobile, '+86 18303033030')
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

      const user = await ctx.service.user.update(createdUser.id, {
        realName: 'updatedName',
        mobile: 'updateMobile'
      })

      assert(user)
      assert.equal(user.password, 'testPassword')
      assert.equal(user.secretSalt, 'testSecretSalt')
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

  describe('Delete', () => {
    it('should delete users in the list of uids', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.user.destroy([createdUser.id])

      assert(result)
      assert.equal(result.n, result.ok)
    })
  })
})
