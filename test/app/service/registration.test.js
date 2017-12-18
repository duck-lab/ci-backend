'use strict'

const { app, assert } = require('egg-mock/bootstrap')
const { flashDB, fixData } = require('../../fixtures/db')
const registrationSource = require('../../fixtures/data/service_registration')

describe('Registration Service', () => {
  let createdRegistration = null
  let registrationUser = null
  let registrationEvent = null

  before(() => flashDB(app.mongoose, 'checkIn_test')
    .then(() => fixData(app.mongoose, registrationSource)))

  describe('Create', () => {
    it('should create registration', async () => {
      const ctx = app.mockContext()

      registrationUser = await ctx.service.user.findByName('ole3021')
      registrationEvent = await ctx.service.event.findByName('WeedingEvent')

      const testRegistration = {
        user: registrationUser.id,
        event: registrationEvent.id,
        registCode: 'testRegCode'
      }

      const registration = await ctx.service.registration.create(testRegistration)
      createdRegistration = registration
      assert(createdRegistration)
      assert.equal(createdRegistration.user, registrationUser.id)
      assert.equal(createdRegistration.event, registrationEvent.id)
      assert.equal(createdRegistration.registCode, 'testRegCode')
    })
  })

  describe('Find', () => {
    it('shuold find registedEvent by filter', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.registration.findRegistedEventsByFilter({
        user: registrationUser.id
      })
      const registedEvents = result.data

      assert(result)
      assert.equal(result.meta.total, 3)
      assert.equal(registedEvents[0].event.title, 'WeedingEvent')
      assert.equal(registedEvents[1].event.title, 'WiredcraftEvent')
    })

    it('should find registedUser by filter', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.registration.findRegistedUsersByFilter({
        event: registrationEvent.id
      })
      const registedUsers = result.data

      assert(result)
      assert.equal(result.meta.total, 2)
      assert.equal(registedUsers[0].user.username, 'ole3021')
      assert.equal(registedUsers[1].user.username, 'oliver')
    })

    it('should find resgister by registCode', async () => {
      const ctx = app.mockContext()

      const registration = await ctx.service.registration.findRegistrationByCode('testRegCode')

      assert(registration)

      assert.equal(registration.user.username, 'ole3021')
      assert.equal(registration.event.title, 'WeedingEvent')
    })
  })

  describe('Update', () => {
    it('should update resgister several fileds by filter', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.registration.updateByFilter({
        user: registrationUser.id,
        event: registrationEvent.id
      }, {
        isRegisted: 'true'
      })

      assert(result)
      assert.equal(result.n, result.ok)
    })
  })

  describe('Delete', () => {
    it('should delete resgister by filter', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.registration.destroyByFilter({
        user: registrationUser.id,
        event: registrationEvent.id
      })

      assert(result)
      assert.equal(result.n, result.ok)
    })
  })
})
