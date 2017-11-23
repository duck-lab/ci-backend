'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('Event Service', () => {
  let createdEvent = null

  before(() => app.ready())
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
      organizers: [{
        name: 'DuckLab',
        logo: 'duckLogo',
        contact: 'tectContact',
        email: 'tectEmail',
        address: 'testAddress',
        site: 'github.com/duck-lab'
      }, {
        name: 'AnotherLab',
        logo: 'AnotherLogo',
        contact: 'AnotherContact',
        email: 'AnotherEmail',
        address: 'AnotherAddress',
        site: 'github.com/another-lab'
      }],
      checkInType: 'QR_CODE_GENERAL'
    }
    it('should create event', async () => {
      const ctx = app.mockContext()

      const event = await ctx.service.event.create(testEvent1)
      createdEvent = event
      assert(event)
      assert(event.postImage === 'testImage')
      assert(event.country === 'China')
      assert(event.province === '上海')
      assert(event.city === '上海')
      assert(event.address === '静安区')
    })
  })

  describe('Find', () => {
    it('should get event with eventId', async () => {
      const ctx = app.mockContext()

      const event = await ctx.service.event.findById(createdEvent.id)
      assert(event)
      assert(event.postImage === 'testImage')
      assert(event.country === 'China')
      assert(event.province === '上海')
      assert(event.city === '上海')
      assert(event.address === '静安区')
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
      assert(event.postImage === 'updatedImage')
      assert(event.country === 'China')
      assert(event.province === '上海')
      assert(event.city === '上海')
      assert(event.address === '静安区')
    })
  })

  describe('Delete', () => {
    it('should delete events in the list of uids', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.event.destroy([createdEvent.id])

      assert(result)
      assert(result.n === result.ok)
    })
  })
})
