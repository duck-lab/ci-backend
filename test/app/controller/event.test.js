'use strict'

let { app, assert } = require('egg-mock/bootstrap')
const { flashDB, fixData } = require('../../fixtures/db')
const eventSource = require('../../fixtures/data/controller_event')

describe('Event Controller', () => {
  // let createdEvent = null

  before(() => flashDB(app.mongoose, 'checkIn_test')
    .then(() => fixData(app.mongoose, eventSource)))

  describe('find or search', () => {
    it('should get all event', () => {
      return app.httpRequest()
        .get('/events')
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.meta.total, 3)
          assert.equal(body.data[0].title, 'WeedingEvent')
          assert.equal(body.data[0].isAutoCheckIn, false)
          assert.equal(body.data[0].isRegistedOnly, false)
          assert.equal(body.data[1].title, 'WiredcraftEvent')
          assert.equal(body.data[1].isAutoCheckIn, false)
          assert.equal(body.data[1].isRegistedOnly, false)
          assert.equal(body.data[2].title, 'DucklabEvnet')
          assert.equal(body.data[2].isAutoCheckIn, true)
          assert.equal(body.data[2].isRegistedOnly, false)
        })
    })

    it('should get event', () => {
      return app.httpRequest()
        .get('/events')
        .query({
          title: 'WiredcraftEvent'
        })
        .expect(200)
        .then(({ body }) => {
          assert(body.meta.total)
          assert.equal(body.data[0].title, 'WiredcraftEvent')
          assert.equal(body.data[0].postImage, 'https://avatars2.githubusercontent.com/u/496772?s=70&v=4')
          assert.equal(body.data[0].country, 'China')
          assert.equal(body.data[0].isAutoCheckIn, false)
          assert.equal(body.data[0].isRegistedOnly, false)
        })
    })

    it('should get a use events list ', () => {
      return app.httpRequest()
        .get('/users/ole3021/events')
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.meta.total, 2)
          assert.equal(body.data[0].event.title, 'WiredcraftEvent')
          assert(body.data[0].registCode)
          assert.equal(body.data[1].event.title, 'DucklabEvnet')
          assert(body.data[1].registCode)
        })
    })

    // it('should get authed user events list', () => {
    //   return app.httpRequest()
    //     .get('/user/events')
    //     .set('Authorization', 'Bearer testToken')
    //     .expect(200)
    //     .then(({ body }) => {
    //       assert.equal(body.meta.total, 2)
    //       assert.equal(body.data[0].event.title, 'WiredcraftEvent')
    //       assert(body.data[0].registCode)
    //       assert.equal(body.data[1].event.title, 'DucklabEvnet')
    //       assert(body.data[1].registCode)
    //     })
    // })
  })

  describe('create', () => {
    // const testEvent = {
    //   title: 'Travel Event',
    //   postImage: 'None',
    //   eventStartAt: new Date('2017-11-20'),
    //   eventEndAt: new Date('2017-11-21'),
    //   checkInStartAt: new Date('2017-11-20'),
    //   checkInEndAt: new Date('2017-11-20'),
    //   country: 'China',
    //   province: '上海',
    //   city: '上海',
    //   address: '静安区',
    //   checkInType: 'QR_CODE_GENERAL'
    // }

    // it('should create event', () => {
    //   return app.httpRequest()
    //     .post('/events')
    //     .set('Authorization', 'Bearer testToken')
    //     .send(testEvent)
    //     .expect(200)
    //     .then(({ body }) => {
    //       assert.equal(body.title, testEvent.title)
    //       assert.equal(body.postImage, testEvent.postImage)
    //       assert.equal(body.country, testEvent.country)
    //       assert.equal(body.isAutoCheckIn, false)
    //       assert.equal(body.isRegistedOnly, false)
    //       // createdEvent = body
    //     })
    // })
  })

  // describe('patch', () => {
  //   it('should patch event', () => {
  //     return app.httpRequest()
  //       .patch(`/events/${createdEvent.title}`)
  //       .set('Authorization', 'Bearer testToken')
  //       .send({
  //         postImage: 'New Test Image',
  //         isAutoCheckIn: true
  //       })
  //       .expect(200)
  //       .then(({ body }) => {
  //         assert.equal(body.title, 'Travel Event')
  //         assert.equal(body.postImage, 'New Test Image')
  //         assert.equal(body.country, 'China')
  //         assert.equal(body.isAutoCheckIn, true)
  //         assert.equal(body.isRegistedOnly, false)
  //       })
  //   })
  // })
})
