'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('event.js', () => {
  const testEvent3 = {
    title: 'testControllerEvent',
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
  let createEventId = null

  it('should create event', () => {
    return app.httpRequest()
      .post('/events')
      .send(testEvent3)
      .expect(200)
      .then(({ body }) => {
        assert.equal(body.title, testEvent3.title)
        assert.equal(body.postImage, testEvent3.postImage)
        assert.equal(body.country, testEvent3.country)
        assert.equal(body.isAutoCheckIn, false)
        assert.equal(body.isRegisteredOnly, false)
        createEventId = body._id
      })
  })

  it('should get event', () => {
    return app.httpRequest()
      .get('/events')
      .query({
        title: 'testControllerEvent'
      })
      .expect(200)
      .then(({ body }) => {
        assert(body.meta.total)
        assert.equal(body.data[0].title, testEvent3.title)
        assert.equal(body.data[0].postImage, testEvent3.postImage)
        assert.equal(body.data[0].country, testEvent3.country)
        assert.equal(body.data[0].isAutoCheckIn, false)
        assert.equal(body.data[0].isRegisteredOnly, false)
      })
  })

  it('should patch event', () => {
    return app.httpRequest()
      .patch(`/events/${createEventId}`)
      .send({
        postImage: 'New Test Image',
        isAutoCheckIn: true
      })
      .expect(200)
      .then(({ body }) => {
        assert.equal(body.title, testEvent3.title)
        assert.equal(body.postImage, 'New Test Image')
        assert.equal(body.country, testEvent3.country)
        assert.equal(body.isAutoCheckIn, true)
        assert.equal(body.isRegisteredOnly, false)
      })
      .catch(err => console.log('>>> err', err))
  })
})
