'use strict'

const { app, assert } = require('egg-mock/bootstrap')

describe('Organizer Service', () => {
  let createdOrganizer = null

  before(() => {
    const ctx = app.mockContext()

    ctx.model.Organizer.collection.drop()
  })

  describe('Create', () => {
    const testUser1 = {
      name: 'organizerName',
      logo: 'http://logo.com/logo',
      contact: '+86 201 1234567',
      email: 'ole3021@gmail.com',
      address: '上海市静安区',
      site: 'http://ole3021.me'
    }
    it('should create organizer', async () => {
      const ctx = app.mockContext()

      const organizer = await ctx.service.organizer.create(testUser1)
      createdOrganizer = organizer
      assert(organizer)
      assert.equal(organizer.name, 'organizerName')
      assert.equal(organizer.logo, 'http://logo.com/logo')
      assert.equal(organizer.contact, '+86 201 1234567')
      assert.equal(organizer.email, 'ole3021@gmail.com')
      assert.equal(organizer.address, '上海市静安区')
      assert.equal(organizer.site, 'http://ole3021.me')
    })
  })

  describe('Find', () => {
    it('should get organizer by name', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.organizer.find({name: 'organizerName'})
      const organizerInfo = result.data[0]

      assert(result)
      assert(organizerInfo)
      assert.equal(result.meta.total, 1)

      assert.equal(organizerInfo.name, 'organizerName')
      assert.equal(organizerInfo.logo, 'http://logo.com/logo')
      assert.equal(organizerInfo.contact, '+86 201 1234567')
      assert.equal(organizerInfo.email, 'ole3021@gmail.com')
      assert.equal(organizerInfo.address, '上海市静安区')
      assert.equal(organizerInfo.site, 'http://ole3021.me')
    })

    it('should get user with userId', async () => {
      const ctx = app.mockContext()

      const organizer = await ctx.service.organizer.findById(createdOrganizer.id)
      assert(organizer)
      assert.equal(organizer.name, 'organizerName')
      assert.equal(organizer.logo, 'http://logo.com/logo')
      assert.equal(organizer.contact, '+86 201 1234567')
      assert.equal(organizer.email, 'ole3021@gmail.com')
      assert.equal(organizer.address, '上海市静安区')
      assert.equal(organizer.site, 'http://ole3021.me')
    })
  })

  describe('Update', () => {
    it('should update user several fileds with id', async () => {
      const ctx = app.mockContext()

      const organizer = await ctx.service.organizer.update(createdOrganizer.id, {
        name: 'updatedName',
        contact: 'updateMobile'
      })

      assert(organizer)
      assert.equal(organizer.name, 'updatedName')
      assert.equal(organizer.logo, 'http://logo.com/logo')
      assert.equal(organizer.contact, 'updateMobile')
      assert.equal(organizer.email, 'ole3021@gmail.com')
      assert.equal(organizer.address, '上海市静安区')
      assert.equal(organizer.site, 'http://ole3021.me')
    })
  })

  describe('Delete', () => {
    it('should delete users in the list of uids', async () => {
      const ctx = app.mockContext()

      const result = await ctx.service.organizer.destroy([createdOrganizer.id])

      assert(result)
      assert(result.n === result.ok)
    })
  })
})
