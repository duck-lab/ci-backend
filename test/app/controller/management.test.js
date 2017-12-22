'use strict'

const { app, assert } = require('egg-mock/bootstrap')
const { flashDB, fixData } = require('../../fixtures/db')
const managementSource = require('../../fixtures/data/controller_management')

describe('Management Controller', () => {
  let injectData = null

  before(() => flashDB(app.mongoose, 'checkIn_test')
    .then(() => fixData(app.mongoose, managementSource))
    .then((result) => { injectData = result }))

  describe('find', () => {
    it('should get all manafers of a event', () => {
      return app.httpRequest()
        .get('/events/DucklabEvnet/managements')
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
    it('should create new manager for event by admin', () => {
      app.mockContext({
        user: injectData.User[0]
      })
      return app.httpRequest()
        .post(`/events/${injectData.Event[1].title}/managements/${injectData.User[1].username}`)
        .set('Authorization', 'Bearer testToken')
        .send({
          role: 'ADMIN'
        })
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.user, injectData.User[1].id)
          assert.equal(body.event, injectData.Event[1].id)
          assert.equal(body.role, 'ADMIN')
        })
    })

    it('should create new manager for organization by admin', () => {
      app.mockContext({
        user: injectData.User[0]
      })
      return app.httpRequest()
        .post(`/orgs/${injectData.Organization[1].name}/managements/${injectData.User[1].username}`)
        .set('Authorization', 'Bearer testToken')
        .send({
          role: 'ADMIN'
        })
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.user, injectData.User[1].id)
          assert.equal(body.organization, injectData.Organization[1].id)
          assert.equal(body.role, 'ADMIN')
        })
    })
  })

  describe('udpate', () => {
    it('should update a manager for event by admin', () => {
      app.mockContext({
        user: injectData.User[0]
      })
      return app.httpRequest()
        .put(`/events/${injectData.Event[1].title}/managements/${injectData.User[1].username}`)
        .set('Authorization', 'Bearer testToken')
        .send({
          role: 'MEMBER'
        })
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.user, injectData.User[1].id)
          assert.equal(body.event, injectData.Event[1].id)
          assert.equal(body.role, 'MEMBER')
        })
    })

    it('should update a manager for organization by admin', () => {
      app.mockContext({
        user: injectData.User[0]
      })
      return app.httpRequest()
        .put(`/orgs/${injectData.Organization[1].name}/managements/${injectData.User[1].username}`)
        .set('Authorization', 'Bearer testToken')
        .send({
          role: 'MEMBER'
        })
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.user, injectData.User[1].id)
          assert.equal(body.organization, injectData.Organization[1].id)
          assert.equal(body.role, 'MEMBER')
        })
    })
  })

  describe('destroy', () => {
    it('should delete a manager for event by admin', () => {
      app.mockContext({
        user: injectData.User[0]
      })
      return app.httpRequest()
        .delete(`/events/${injectData.Event[1].title}/managements/${injectData.User[1].username}`)
        .set('Authorization', 'Bearer testToken')
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.ok, 1)
        })
    })

    it('should delete a manager for organization by admin', () => {
      app.mockContext({
        user: injectData.User[0]
      })
      return app.httpRequest()
        .delete(`/orgs/${injectData.Organization[1].name}/managements/${injectData.User[1].username}`)
        .set('Authorization', 'Bearer testToken')
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.ok, 1)
        })
    })
  })
})
