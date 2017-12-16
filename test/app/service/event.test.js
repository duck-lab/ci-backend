'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('Event Service', () => {
  let createdEvent = null

  after(() => {
    const ctx = app.mockContext()

    ctx.model.Event.collection.drop()
  })

  describe('Create', () => {
    const testEvent1 = {
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

      const event = await ctx.service.event.create(testEvent1)
      createdEvent = event
      assert(event)
      assert.equal(event.postImage, 'testImage')
      assert.equal(event.country, 'China')
      assert.equal(event.province, '上海')
      assert.equal(event.city, '上海')
      assert.equal(event.address, '静安区')
    })
  })

  describe('Find', () => {
    it('should get event by title', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.event.find({title: 'testEvent'})
      const eventInfo = result.data[0]

      assert(result)
      assert(eventInfo)
      assert.equal(result.meta.total, 1)

      assert.equal(eventInfo.postImage, 'testImage')
      assert.equal(eventInfo.country, 'China')
      assert.equal(eventInfo.province, '上海')
      assert.equal(eventInfo.city, '上海')
      assert.equal(eventInfo.address, '静安区')
    })

    it('should get event with eventId', async () => {
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
    it('should update event several fileds with id', async () => {
      const ctx = app.mockContext()

      const event = await ctx.service.event.update(createdEvent.id, {
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

  describe('Delete', () => {
    it('should delete events in the list of uids', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.event.destroy([createdEvent.id])

      assert(result)
      assert.equal(result.n, result.ok)
    })
  })
})
