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
      nickName: 'ole3021',
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
      assert(user.password === 'testPassword')
      assert(user.secretSalt === 'testSecretSalt')
      assert(user.mobile === '+86 18303033030')
      assert(user.email === 'ole3021@gmail.com')
      assert(user.nickName === 'ole3021')
      assert(user.realName === 'Oliver.W')
      assert(user.country === 'China')
      assert(user.province === '上海')
      assert(user.city === '上海')
      assert(user.address === '静安区')
    })
  })

  describe('Find', () => {
    it('should get user with userId', async () => {
      const ctx = app.mockContext()

      const user = await ctx.service.user.findById(createdUser.id)
      assert(user)
      assert(user.password === 'testPassword')
      assert(user.secretSalt === 'testSecretSalt')
      assert(user.mobile === '+86 18303033030')
      assert(user.email === 'ole3021@gmail.com')
      assert(user.nickName === 'ole3021')
      assert(user.realName === 'Oliver.W')
      assert(user.country === 'China')
      assert(user.province === '上海')
      assert(user.city === '上海')
      assert(user.address === '静安区')
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
      assert(user.password === 'testPassword')
      assert(user.secretSalt === 'testSecretSalt')
      assert(user.mobile === 'updateMobile')
      assert(user.email === 'ole3021@gmail.com')
      assert(user.nickName === 'ole3021')
      assert(user.realName === 'updatedName')
      assert(user.country === 'China')
      assert(user.province === '上海')
      assert(user.city === '上海')
      assert(user.address === '静安区')
    })
  })

  describe('Delete', () => {
    it('should delete users in the list of uids', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.user.destroy([createdUser.id])

      assert(result)
      assert(result.n === result.ok)
    })
  })
})
