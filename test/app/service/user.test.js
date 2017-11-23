'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('create()', () => {
  before(() => app.ready())

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
