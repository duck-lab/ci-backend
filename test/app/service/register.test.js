'use strict'

const { app, assert } = require('egg-mock/bootstrap')
const { flashDB, fixData } = require('../../fixtures/db')
const registerSource = require('../../fixtures/data/service_register')

describe('Register Service', () => {
  let createdRegister = null
  let registerUser = null
  let registerEvent = null

  before(async () => flashDB(app.mongoose, 'checkIn_test')
    .then(fixData(app.mongoose, registerSource)))

  describe('Create', () => {
    it('should create register', async () => {
      const ctx = app.mockContext()

      registerUser = await ctx.service.user.findByName('ole3021')
      registerEvent = await ctx.service.event.findByName('WeedingEvent')

      const testRegister = {
        user: registerUser.id,
        event: registerEvent.id,
        registCode: 'testRegCode'
      }

      const register = await ctx.service.register.create(testRegister)
      createdRegister = register
      assert(createdRegister)
      assert.equal(createdRegister.user, registerUser.id)
      assert.equal(createdRegister.event, registerEvent.id)
      assert.equal(createdRegister.registCode, 'testRegCode')
    })
  })

  describe('Find', () => {
    it('shuold find registedEvent by filter', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.register.findRegistedEventsByFilter({
        user: registerUser.id
      })
      const registedEvents = result.data

      assert(result)
      assert.equal(result.meta.total, 3)
      assert.equal(registedEvents[0].event.title, 'WeedingEvent')
      assert.equal(registedEvents[1].event.title, 'WiredcraftEvent')
    })

    it('should find registedUser by filter', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.register.findRegistedUsersByFilter({
        event: registerEvent.id
      })
      const registedUsers = result.data

      assert(result)
      assert.equal(result.meta.total, 2)
      assert.equal(registedUsers[0].user.username, 'ole3021')
      assert.equal(registedUsers[1].user.username, 'oliver')
    })

    it('should find resgister by registCode', async () => {
      const ctx = app.mockContext()

      const register = await ctx.service.register.findRegisterByCode('testRegCode')

      assert(register)

      assert.equal(register.user.username, 'ole3021')
      assert.equal(register.event.title, 'WeedingEvent')
    })
  })

  describe('Update', () => {
    it('should update resgister several fileds by filter', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.register.updateByFilter({
        user: registerUser.id,
        event: registerEvent.id
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

      const result = await ctx.service.register.destroyByFilter({
        user: registerUser.id,
        event: registerEvent.id
      })

      assert(result)
      assert.equal(result.n, result.ok)
    })
  })
})
