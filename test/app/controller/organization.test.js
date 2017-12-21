'use strict'

const { app, assert } = require('egg-mock/bootstrap')
const { flashDB, fixData } = require('../../fixtures/db')
const organizationSource = require('../../fixtures/data/controller_organization')

describe('Organization Controller', () => {
  let injectData = null
  let createdOrganization = null

  before(() => flashDB(app.mongoose, 'checkIn_test')
    .then(() => fixData(app.mongoose, organizationSource))
    .then((result) => { injectData = result }))

  describe('find or search', () => {
    it('should get all organization', () => {
      return app.httpRequest()
        .get('/orgs')
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.meta.total, 3)
          assert.equal(body.data[0].name, 'JSConf')
          assert.equal(body.data[0].contact, '18330033300')
          assert.equal(body.data[0].email, 'ole3021@gmail.com')
          assert.equal(body.data[1].name, 'Wiredcraft')
          assert.equal(body.data[1].contact, '18330033301')
          assert.equal(body.data[1].email, 'ole3021@wiredcraft.com')
          assert.equal(body.data[2].name, 'Ducklab')
          assert.equal(body.data[2].contact, '18330033302')
          assert.equal(body.data[2].email, 'ole3021@ducklab.com')
        })
    })

    it('should search organization', () => {
      return app.httpRequest()
        .get('/orgs')
        .query({
          name: 'Wiredcraft'
        })
        .expect(200)
        .then(({ body }) => {
          assert(body.meta.total)
          assert.equal(body.data[0].name, 'Wiredcraft')
          assert.equal(body.data[0].contact, '18330033301')
          assert.equal(body.data[0].email, 'ole3021@wiredcraft.com')
        })
    })

    it('should get currently authed user organizations list', () => {
      app.mockContext({
        user: injectData.User[0]
      })
      return app.httpRequest()
        .get('/user/orgs')
        .set('Authorization', 'Bearer testToken')
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.meta.total, 2)
          assert.equal(body.data[0].organization.name, 'Wiredcraft')
          assert(body.data[0].organization.contact, '18330033301')
          assert.equal(body.data[1].organization.name, 'Ducklab')
          assert(body.data[1].organization.contact, '18330033302')
        })
    })

    it('should get organization by name', () => {
      return app.httpRequest()
        .get('/orgs/Ducklab')
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.name, 'Ducklab')
          assert.equal(body.contact, '18330033302')
          assert.equal(body.address, '上海市静安区')
        })
    })
  })

  describe('create', () => {
    const testOrg = {
      name: 'Test Org',
      logo: 'testlogo',
      contact: 'test contact',
      email: 'test@test.com',
      address: 'testaddress',
      site: 'test.com'
    }

    it('should create organization', () => {
      app.mockContext({
        user: injectData.User[0]
      })
      return app.httpRequest()
        .post('/orgs')
        .set('Authorization', 'Bearer testToken')
        .send(testOrg)
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.name, 'Test Org')
          assert.equal(body.logo, 'testlogo')
          assert.equal(body.contact, 'test contact')
          assert.equal(body.email, 'test@test.com')
          assert.equal(body.site, 'test.com')
          createdOrganization = body
        })
    })
  })

  describe('patch', () => {
    it('should patch organization', () => {
      app.mockContext({
        user: injectData.User[0]
      })
      return app.httpRequest()
        .patch(`/orgs/${createdOrganization.name}`)
        .set('Authorization', 'Bearer testToken')
        .send({
          logo: 'New testlogo',
          email: 'newTest@test.com'
        })
        .expect(200)
        .then(({ body }) => {
          assert.equal(body.name, 'Test Org')
          assert.equal(body.logo, 'New testlogo')
          assert.equal(body.contact, 'test contact')
          assert.equal(body.email, 'newTest@test.com')
          assert.equal(body.site, 'test.com')
        })
    })
  })
})
