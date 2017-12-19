'use strict'

const { app, assert } = require('egg-mock/bootstrap')
const { flashDB, fixData } = require('../../fixtures/db')
const eventSource = require('../../fixtures/data/service_event')

describe('Event Service', () => {
  let createdEvent = null

  before(() => flashDB(app.mongoose, 'checkIn_test')
    .then(() => fixData(app.mongoose, eventSource)))

  describe('Create', () => {
    const testEvent = {
      title: 'testEvent',
      postImage: 'testImage',
      eventStartAt: new Date('2017-11-20'),
      eventEndAt: new Date('2017-11-21'),
      checkInStartAt: new Date('2017-11-20'),
      checkInEndAt: new Date('2017-11-20'),
      country: 'China',
      province: '上海',
      city: '上海',
      address: '静安区',
      checkInType: 'QR_CODE_GENERAL'
    }
    it('should create event', async () => {
      const ctx = app.mockContext()
      const user = await ctx.service.user.findByName('ole3021')

      const event = await ctx.service.event.createWithUserId(testEvent, user.id)
      const management = await ctx.service.management.findOneByFilter({
        user: user.id,
        event: event.id
      })
      createdEvent = event
      assert(event)
      assert(management)
      assert.equal(event.postImage, 'testImage')
      assert.equal(event.country, 'China')
      assert.equal(event.province, '上海')
      assert.equal(event.city, '上海')
      assert.equal(event.address, '静安区')
      assert.equal(management.user, user.id)
      assert.equal(management.event, event.id)
      assert.equal(management.role, 'OWNER')
    })
  })

  describe('Find', () => {
    it('should find event by filter', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.event.findByFilter({title: 'testEvent'})
      const event = result.data[0]

      assert(event)
      assert.equal(event.postImage, 'testImage')
      assert.equal(event.country, 'China')
      assert.equal(event.province, '上海')
      assert.equal(event.city, '上海')
      assert.equal(event.address, '静安区')
    })

    it('should fine event by title', async () => {
      const ctx = app.mockContext()

      const event = await ctx.service.event.findByName('testEvent')

      assert(event)
      assert.equal(event.postImage, 'testImage')
      assert.equal(event.country, 'China')
      assert.equal(event.province, '上海')
      assert.equal(event.city, '上海')
      assert.equal(event.address, '静安区')
    })

    it('should get event by eventId', async () => {
      const ctx = app.mockContext()

      const event = await ctx.service.event.findById(createdEvent.id)
      assert(event)
      assert.equal(event.postImage, 'testImage')
      assert.equal(event.country, 'China')
      assert.equal(event.province, '上海')
      assert.equal(event.city, '上海')
      assert.equal(event.address, '静安区')
    })
  })

  describe('Update', () => {
    it('should update event several fileds by eventId', async () => {
      const ctx = app.mockContext()

      const event = await ctx.service.event.updateById(createdEvent.id, {
        title: 'udpatedTitle',
        postImage: 'updatedImage'
      })

      assert(event)
      assert.equal(event.postImage, 'updatedImage')
      assert.equal(event.country, 'China')
      assert.equal(event.province, '上海')
      assert.equal(event.city, '上海')
      assert.equal(event.address, '静安区')
    })
  })
})
