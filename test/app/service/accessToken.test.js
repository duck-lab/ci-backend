'use strict'

const { app, assert } = require('egg-mock/bootstrap')
const { flashDB } = require('../../fixtures/db')

describe('AccessToken Service', () => {
  let createdAccessToken = null

  before(() => flashDB(app.mongoose, 'checkIn_test'))

  describe('Create', () => {
    const testAccessToken = {
      accessToken: '481be677a857e7accd8d4c396aea4926152bb20a',
      accessTokenExpiresAt: new Date('2017-12-17T09:32:01.281Z'),
      refreshToken: '66e2f1ffefb8bd8cb40ea1e7fb56af834383bbf3',
      refreshTokenExpiresAt: new Date('2017-12-31T08:32:01.281Z'),
      user: {
        userId: '5a36218c24f8a67541b25092'
      },
      client: {
        grants: ['password'],
        clientId: 'test'
      }
    }

    it('should create accessToken', async () => {
      const ctx = app.mockContext()

      const accessToken = await ctx.service.accessToken.create(testAccessToken)
      createdAccessToken = accessToken
      assert(accessToken)
      assert.equal(accessToken.accessToken, '481be677a857e7accd8d4c396aea4926152bb20a')
      assert.equal(accessToken.refreshToken, '66e2f1ffefb8bd8cb40ea1e7fb56af834383bbf3')
      assert.equal(accessToken.user.userId, '5a36218c24f8a67541b25092')
    })
  })

  describe('Find by Token', () => {
    it('should find accessToken by token', async () => {
      const ctx = app.mockContext()

      const accessToken = await ctx.service.accessToken.findByToken(createdAccessToken.accessToken)
      assert(accessToken)
      assert.equal(accessToken.accessToken, '481be677a857e7accd8d4c396aea4926152bb20a')
      assert.equal(accessToken.refreshToken, '66e2f1ffefb8bd8cb40ea1e7fb56af834383bbf3')
      assert.equal(accessToken.user.userId, '5a36218c24f8a67541b25092')
    })
  })

  describe('Destroy by Token', () => {
    it('should destroy accessToken by token', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.accessToken.destroyByToken(createdAccessToken.accessToken)

      assert(result)
      assert.equal(result.n, result.ok)
    })
  })
})
