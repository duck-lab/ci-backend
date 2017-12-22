'use strict'

const { app, assert } = require('egg-mock/bootstrap')
const { flashDB, fixData } = require('../../fixtures/db')
const registrationSource = require('../../fixtures/data/controller_registration')

describe('Registration Controller', () => {
  let injectData = null

  before(() => flashDB(app.mongoose, 'checkIn_test')
    .then(() => fixData(app.mongoose, registrationSource))
    .then((result) => { injectData = result }))

  describe('find or search', () => {
    it('should get all registred users of a event', () => {
      return app.httpRequest()
        .get('/events/DucklabEvnet/registrations')
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.meta.total, 2)
          assert.equal(body.data[0].user.username, 'oliver')
          assert.equal(body.data[0].user.mobile, '+86 18333333333')
          assert.equal(body.data[0].user.email, 'oliver@gmail.com')
          assert.equal(body.data[1].user.username, 'ole3021')
          assert.equal(body.data[1].user.mobile, '+86 18303033030')
          assert.equal(body.data[1].user.email, 'ole3021@gmail.com')
        })
    })
  })

  describe('create', () => {
    it('should create registration by user for self-registry event', () => {
      app.mockContext({
        user: injectData.User[0]
      })
      return app.httpRequest()
        .post(`/events/${injectData.Event[2].title}/registration/`)
        .set('Authorization', 'Bearer testToken')
        .expect(200)
        .then(({ body }) => {
          assert(body.registCode)
          assert.equal(body.user, injectData.User[0].id)
          assert.equal(body.mobile, injectData.User[0].mobile)
          assert.equal(body.event, injectData.Event[2].id)
          assert.equal(body.isRegisted, false)
        })
    })

    it('should create registration by admin for other user', () => {
      app.mockContext({
        user: injectData.User[0]
      })
      return app.httpRequest()
        .post('/events/WeedingEvent/registration/oliver')
        .set('Authorization', 'Bearer testToken')
        .expect(200)
        .then(({ body }) => {
          assert(body.registCode)
          assert.equal(body.user, injectData.User[1].id)
          assert.equal(body.mobile, injectData.User[1].mobile)
          assert.equal(body.event, injectData.Event[2].id)
          assert.equal(body.isRegisted, false)
        })
    })
  })

  describe('checkIn', () => {
    it('should check in authed user for self-checkin event', () => {
      app.mockContext({
        user: injectData.User[0]
      })
      return app.httpRequest()
        .put('/events/DucklabEvnet/checkin/')
        .set('Authorization', 'Bearer testToken')
        .expect(200)
        .then(({ body }) => {
          assert(body.registCode)
          assert.equal(body.user, injectData.User[0].id)
          assert.equal(body.mobile, injectData.User[0].mobile)
          assert.equal(body.event, injectData.Event[0].id)
          assert.equal(body.isRegisted, true)
        })
    })

    it('should check in registration user by admin', () => {
      app.mockContext({
        user: injectData.User[0]
      })
      return app.httpRequest()
        .put('/events/WeedingEvent/checkin/oliver')
        .set('Authorization', 'Bearer testToken')
        .expect(200)
        .then(({ body }) => {
          assert(body.registCode)
          assert.equal(body.user, injectData.User[1].id)
          assert.equal(body.mobile, injectData.User[1].mobile)
          assert.equal(body.event, injectData.Event[2].id)
          assert.equal(body.isRegisted, true)
        })
    })
  })

  describe('cancel checkIn', () => {
    it('should cancel authed user checkIn info for self-checkin event', () => {
      app.mockContext({
        user: injectData.User[0]
      })
      return app.httpRequest()
        .delete('/events/DucklabEvnet/checkin/')
        .set('Authorization', 'Bearer testToken')
        .expect(200)
        .then(({ body }) => {
          assert(body.registCode)
          assert.equal(body.user, injectData.User[0].id)
          assert.equal(body.mobile, injectData.User[0].mobile)
          assert.equal(body.event, injectData.Event[0].id)
          assert.equal(body.isRegisted, false)
        })
    })

    it('should check in registration user by admin', () => {
      app.mockContext({
        user: injectData.User[0]
      })
      return app.httpRequest()
        .delete('/events/WeedingEvent/checkin/oliver')
        .set('Authorization', 'Bearer testToken')
        .expect(200)
        .then(({ body }) => {
          assert(body.registCode)
          assert.equal(body.user, injectData.User[1].id)
          assert.equal(body.mobile, injectData.User[1].mobile)
          assert.equal(body.event, injectData.Event[2].id)
          assert.equal(body.isRegisted, false)
        })
    })
  })

  describe('remove', () => {
    it('should remove a user registations by admin', () => {
      app.mockContext({
        user: injectData.User[0]
      })
      return app.httpRequest()
        .delete(`/events/WeedingEvent/checkin/oliver`)
        .set('Authorization', 'Bearer testToken')
        .expect(200)
        .then(({ body }) => {
          assert(body.registCode)
          assert.equal(body.user, injectData.User[1].id)
          assert.equal(body.mobile, injectData.User[1].mobile)
          assert.equal(body.event, injectData.Event[2].id)
        })
    })
  })
})
