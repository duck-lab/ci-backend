'use strict'

const { app, assert } = require('egg-mock/bootstrap')
const { flashDB, fixData } = require('../../fixtures/db')
const userSource = require('../../fixtures/data/controller_user')

describe('User Controller', () => {
  let injectData = null

  before(() => flashDB(app.mongoose, 'checkIn_test')
    .then(() => fixData(app.mongoose, userSource))
    .then((result) => { injectData = result }))

  describe('find or search', () => {
    it('should get all users', () => {
      return app.httpRequest()
        .get('/users')
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.meta.total, 2)
          assert.equal(body.data[0].username, 'oliver')
          assert.equal(body.data[0].realName, 'Oliver.Z')
          assert.equal(body.data[0].country, 'England')
          assert.equal(body.data[0].city, 'York')
          assert.equal(body.data[1].username, 'ole3021')
          assert.equal(body.data[1].realName, 'Oliver.W')
          assert.equal(body.data[1].country, 'China')
          assert.equal(body.data[1].city, '上海')
        })
    })

    it('should get current authed user info', () => {
      app.mockContext({
        user: injectData.User[0]
      })
      return app.httpRequest()
        .get('/user')
        .set('Authorization', 'Bearer testToken')
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.mobile, '+86 18303033030')
          assert.equal(body.email, 'ole3021@gmail.com')
          assert.equal(body.username, 'ole3021')
          assert.equal(body.realName, 'Oliver.W')
          assert.equal(body.country, 'China')
        })
    })

    it('should get user by name', () => {
      return app.httpRequest()
        .get('/users/ole3021')
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.mobile, '+86 18303033030')
          assert.equal(body.email, 'ole3021@gmail.com')
          assert.equal(body.username, 'ole3021')
          assert.equal(body.realName, 'Oliver.W')
          assert.equal(body.country, 'China')
        })
    })
  })

  describe('create', () => {
    const testUser = {
      password: 'testPassword',
      mobile: 'testMobile',
      email: 'test@test.com',
      username: 'testUser',
      realName: 'Tester',
      country: 'China',
      province: '北京',
      city: '北京',
      address: 'address'
    }

    it('should create user', () => {
      app.mockContext({
        user: injectData.User[0]
      })
      return app.httpRequest()
        .post('/users')
        .set('Authorization', 'Bearer testToken')
        .send(testUser)
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.mobile, 'testMobile')
          assert.equal(body.email, 'test@test.com')
          assert.equal(body.username, 'testUser')
          assert.equal(body.realName, 'Tester')
          assert.equal(body.province, '北京')
        })
    })

    describe('patch', () => {
      it('should patch user', () => {
        app.mockContext({
          user: injectData.User[0]
        })
        return app.httpRequest()
          .patch('/user')
          .set('Authorization', 'Bearer testToken')
          .send({
            mobile: 'New Test Mobile',
            realName: 'New Tester'
          })
          .expect(200)
          .then(({ body }) => {
            assert.equal(body.mobile, 'New Test Mobile')
            assert.equal(body.email, 'ole3021@gmail.com')
            assert.equal(body.username, 'ole3021')
            assert.equal(body.realName, 'New Tester')
            assert.equal(body.province, '上海')
          })
      })
    })
  })
})
